const express = require('express')
const path = require('path');
const { ethers } = require("ethers");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'))
const BNC_sec = "df3622387a93585910796aa87f968ceb91df7935a9d3b3fb25e4faa416391015"
//const BNC_pub = "0xc96502936C79Ff1d61E00a8CBbD0352D732a31a7"

const contract = "0xb6ddea8a7f00c2eb5825db06e0f3e9a4ce081985"
const daiAbi = [
    "function get_ip(string memory _dn) public view returns(string memory)",
    "function get_records(address _addr) public view returns(string[] memory)",
    "function set_record(string memory _ipv4, string memory _dn, address _addr) public",
    "function update_ip(string memory _dn, string memory _newip) public"
]

////////////////////////////////////////////////////////////
// BNC func

async function set_new_dn(DN,Owner){

    if(DN.length <5 || !DN.endsWith('.pfe')){
        return -2
    }

    if(!Owner){
        return -1
    }
    try{
        const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/");
        const wallet = new ethers.Wallet(BNC_sec,provider);
        
        
        const daiContract = new ethers.Contract(contract, daiAbi, provider);
        const signedContract = daiContract.connect(wallet)

        asked_ip = await signedContract.set_record("0.0.0.0", DN, Owner)
        return("{\"status\":\"success\"}")
    }catch(e){
        console.log(e)
        return("{\"status\":\"failed\"}")
    }
    
    
}



////////////////////////////////////////////////////////////
// WEB ROUTES
app.get('/', (req, res) => {
    res.redirect('/buy');
});

app.get('/dashboard', function(req, res) {
    res.sendFile(path.join(__dirname+'/views/myDomains.html'));
});

app.get('/buy',function(req,res){
    res.sendFile(path.join(__dirname+'/views/buyDomains.html'));

});


////////////////////////////////////////////////////////////
// API ROUTES

app.post('/buy',async function(req,res){
    console.log(req.body.buyer,req.body.domain)
    transaction = await set_new_dn(req.body.domain,req.body.buyer)
    
    res.send(transaction);

});


////////////////////////////////////////////////////////////

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
