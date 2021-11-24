const Migrations = artifacts.require("Migrations");

module.exports = async function(deployer) {
  const accounts = await web3.eth.getAccounts();
  console.log(accounts);
  await deployer.deploy(Migrations);
    var testMig = await Migrations.deployed();
    
  
    var owner = await testMig.owner();
    if(owner==accounts[0]){
      await console.log("Correct owner");
    }else{
      await console.log("Something is wrong");
  
  }
};
