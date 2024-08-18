// SPDX-License-Identifier: Unlicensed

pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract SansaoToken is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("SansaoToken", "SNS") Ownable() {
        _mint(msg.sender, initialSupply);
    }
}
