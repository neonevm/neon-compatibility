const SelfDestructTest = artifacts.require("SelfDestructTest");

module.exports = async function(deployer) {
    const accounts = await web3.eth.getAccounts();

    await deployer.deploy(SelfDestructTest);
    var testContract = await SelfDestructTest.deployed();
    
    var balanceBefore = await web3.eth.getBalance(accounts[0]).then((response)=>{
        return(response.toString(10));
    })
    await console.log("Sending ether to contract");
    await web3.eth.sendTransaction({to:testContract.address, from:accounts[0], value: '100'})
    var balanceAfter = await web3.eth.getBalance(accounts[0]).then((response)=>{
        return(response.toString(10));
    })
    var contractBalance = await web3.eth.getBalance(testContract.address).then((response)=>{
        return(response.toString(10));
    })
    await console.log(balanceBefore,"---",balanceAfter,"---",contractBalance);

    await console.log("Hello0");
    
    await testContract.destroyContract();

    await console.log("Hello1");


    var balanceAfterSelfDestruct = await web3.eth.getBalance(accounts[0]).then((response)=>{
        return(response.toString(10));
    })
    var contractBalanceSelfDestruct = await web3.eth.getBalance(testContract.address).then((response)=>{
        return(response.toString(10));
    })
    await console.log(balanceAfterSelfDestruct,"---",contractBalanceSelfDestruct);
    if(contractBalanceSelfDestruct==="0"){
        await console.log("Self Destruction Successful")
    }else{
        await console.log("Something Went Wrong")
    }

};