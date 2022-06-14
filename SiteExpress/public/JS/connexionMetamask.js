

async function connectMetaMask(){

    if(typeof window.ethereum !== "undefined"){
        try
        {
            await ethereum.request({ method: "eth_requestAccounts" });
        }
        catch (error) {
            console.log(error);
        }
        document.getElementById("connectButton").innerHTML = "Connected";

        const accounts = await ethereum.request({ method: "eth_accounts" });
        console.log("accounts"+accounts);
        document.getElementById("adressePublique").innerHTML = accounts;
        console.log(accounts);
        
        var xhr = new XMLHttpRequest();
        xhr.open("POST", '/login', true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() { // Call a function when the state changes.
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                window.location = this.responseText;
            }
        }
        xhr.send("account="+accounts);
    }
    else {
        document.getElementById("connectButton").innerHTML ="Please install MetaMask";
      }
}