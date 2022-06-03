const DnsOnBlock = artifacts.require("DnsOnBlock");
 
module.exports = function(deployer) {
  deployer.deploy(DnsOnBlock);
};