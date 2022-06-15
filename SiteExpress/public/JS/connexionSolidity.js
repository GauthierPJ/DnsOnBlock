

async function connectSolidity(){
    const public = '0x0357faf923782944ed7b803d29a967887c402612';
    console.log(public);
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // Pour cela, nous avons besoin du signataire du compte...
    const signer = provider.getSigner()

}