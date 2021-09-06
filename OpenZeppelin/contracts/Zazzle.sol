// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Zazzle is ERC20 {
    constructor(uint256 _supply) ERC20("Zazzle", "ZAZL") {
        _mint(msg.sender, _supply * (10**decimals()));
    }
}
