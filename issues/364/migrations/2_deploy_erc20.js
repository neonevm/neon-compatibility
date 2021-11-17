const ERC20Test = artifacts.require("ERC20Test");

module.exports = async function(deployer) {
    const accounts = await web3.eth.getAccounts();

    await deployer.deploy(ERC20Test,{from:accounts[1]});
    var testERC20 = await ERC20Test.deployed();
    await testERC20.balanceOf(accounts[1]).then((response)=>{
        if(response.toString(10)==="1000000000000000000000000"){
             console.log("ERC20 : Owner balance Checked")
        }else{
             console.log("ERC20 : Owner balance Is wrong")
        }
    })
    await testERC20.transfer(accounts[0],"100000000000000000000000",{from:accounts[1]})
    await testERC20.balanceOf(accounts[1]).then((response)=>{
        if(response.toString(10)==="900000000000000000000000"){
         console.log("ERC20 : Owner balance Checked after transfer")
    }else{
         console.log("ERC20 : Owner balance Is wrong after transfer")
    }
    })
    await testERC20.balanceOf(accounts[0]).then((response)=>{
        if(response.toString(10)==="100000000000000000000000"){
         console.log("ERC20 : Receiver balance Checked")
    }else{
         console.log("ERC20 : Receiver balance Is wrong")
    }
    })

};