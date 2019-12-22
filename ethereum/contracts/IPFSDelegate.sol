// Solidity CDN delegate
// Copyright Michael Chan
// From: https://github.com/mcchan1/eth-ipfs
pragma solidity ^0.5.0;

contract IPFSDelegate
{
    string ipfsHash;

    function sendHash(string memory x) public
    {
        ipfsHash = x;
    }

    function getHash() public view returns (string memory x)
    {
        return ipfsHash;
    }
}