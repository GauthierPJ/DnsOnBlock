// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.14;


contract DnsOnBlock{

    mapping(address => string[]) public property; // addr => dn[]
    mapping(string => string) public dns_record; // dn => ip

    constructor(){
        string[] memory tab_dn = new string[](3);
        string[] memory tab_ip = new string[](3);

        tab_dn[0] = "default1.pfe";
        tab_dn[1] = "default2.pfe";
        tab_dn[2] = "default3.pfe";

        tab_ip[0] = "172.172.172.1";
        tab_ip[1] = "172.172.172.2";
        tab_ip[2] = "172.172.172.3";
        
        dns_record[tab_dn[0]] = tab_ip[0];
        dns_record[tab_dn[1]] = tab_ip[1];
        dns_record[tab_dn[2]] = tab_ip[2];

        address add = 0xc96502936C79Ff1d61E00a8CBbD0352D732a31a7;
        property[add] = tab_dn;              
    }

    // Return IP from DN
    function get_ip(string memory _dn) public view returns(string memory){
        // If the domain name is stored, returns the associated ipv4. 
        // Otherwise, the transactions is not being processed ("require")
        require(!compare(dns_record[_dn], ""), "This DN does not exist.");
        // Returns the associated ipv4
        return dns_record[_dn];
    }

    // Return all the domain names of a user
    function get_records(address _addr) public view returns(string[] memory){
        require(property[_addr].length != 0, "This address does not exist.");
        return(property[_addr]);
    }

    // Set a new dns record
    function set_record(string memory _ipv4, string memory _dn, address _addr) public {
        // Domain name has to be free
        require(compare(dns_record[_dn], "") , "This DN is already taken.");
        // Only the Dns On Blockchain service is able to store new domain name
        require(msg.sender == 0xc96502936C79Ff1d61E00a8CBbD0352D732a31a7, "You are not allowed to store new domain name freely.");
        // We store the domain name
        dns_record[_dn] = _ipv4;
        property[_addr].push(_dn);
    }

    // Update ip address of an existing dn
    function update_ip(string memory _dn, string memory _newip, address _owner) public {
        require(!compare(dns_record[_dn], ""), "Can't update IP : this domain name does not exist.");
        // Only the owner can change the ip of his domain name
        require(msg.sender == _owner, "Can't update IP address : only the domain names owner can do this operation.");
        dns_record[_dn] = _newip;
    }

    // Update the owner of domain names
    function update_owner(address _owner, address _newowner) public {
        require(msg.sender == _owner, "Can't update owner : only the domain names owner can do this operation.");
        property[_newowner] = property[_owner];
        delete property[_owner];        
    }

    function delete_dn(address _owner, string memory _dn) public {
        require(msg.sender == _owner, "Can't delete DN : only the domain names owner can do this operation.");
        uint i = 0;
        bool b = true;
        while(i < property[_owner].length && b){
            if(compare(property[_owner][i], _dn)){
                remove_el(property[_owner], _dn);
                b = false;
            }
            i++;
        }
        delete dns_record[_dn];
    }    

    //----------------------------- UTILS -----------------------------//

    // Return "these strings are the same"
    function compare(string memory s1, string memory s2) internal pure returns (bool) {
        return keccak256(abi.encodePacked(s1)) == keccak256(abi.encodePacked(s2));
    }

    // Remove the string element from an array
    function remove_el(string[] storage array , string memory el) internal {
        bool found = false;
        for(uint i = 0 ; i < array.length-1 ; i++){
            // As soon as we find the element to remove
            found = found || compare(array[i], el);
            if(found){
                array[i] = array[i+1];
            }            
        }
        array.pop();
    }
}