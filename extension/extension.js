
const contactAddr = "0xb6ddea8a7f00c2eb5825db06e0f3e9a4ce081985"


const daiAbi = [
    "function get_ip(string memory _dn) public view returns(string memory)",
    "function get_records(address _addr) public view returns(string[] memory)",
    "function set_record(string memory _ipv4, string memory _dn, address _addr) public",
    "function update_ip(string memory _dn, string memory _newip) public"
]



async function get_ip(addr){

    const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/");
    contract = new ethers.Contract(contactAddr,daiAbi,provider)

    try{
        res = await contract.get_ip(addr)
        return (res)
    }
    catch(e){
        console.log("Erreur lors de la résolution... :"  + e)
    }
}


browser.webNavigation.onBeforeNavigate.addListener(async (event)=>{
    addr = event.url


    chemin = new URL(addr)
    console.log(chemin)
    if(chemin.hostname.endsWith('.pfe')){
        if (chemin.port) {
            route = ":"+chemin.port+chemin.pathname + chemin.search
        }
        else{
            route = chemin.pathname + chemin.search
        }
        browser.tabs.update({url:"about:blank"});
        var res = await get_ip(chemin.hostname)
        browser.tabs.update({url:"http://"+res+route});
        window.history.pushState("State Object", "Title", "http://"+chemin.hostname+route);
    }
})

