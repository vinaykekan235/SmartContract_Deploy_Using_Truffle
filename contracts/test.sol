// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token1 is ERC20, ERC20Burnable, Ownable {
    constructor(
        address initialOwner
    ) ERC20("TestToken", "TT") Ownable(initialOwner) {
        _mint(msg.sender, 10000000000000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
// 0x5e6Ae72a1AbeAb7B3DC2Ec930e589c01dC1B1d07