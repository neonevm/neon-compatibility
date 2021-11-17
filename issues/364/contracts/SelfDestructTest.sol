pragma solidity ^0.8.2;

import "@openzeppelin/contracts/access/Ownable.sol";

contract SelfDestructTest is Ownable{
    
    address baseTransferAddress;

    constructor(){
        baseTransferAddress = msg.sender;
    }
    function staticData() public view returns(string memory) {
        return("Function is Active");
    }

    function destroyContract() public onlyOwner {
        selfdestruct(payable(baseTransferAddress));
    }

    fallback() external payable {}

}