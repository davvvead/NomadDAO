// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ResidencyNFT {
    string public name = "Nomad Residency";
    string public symbol = "NMD";
    uint256 public tokenCounter = 1;

    mapping(uint256 => address) public ownerOf;
    mapping(address => bool) public hasMinted;
    mapping(uint256 => string) public tokenURIs;

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);

    function mint(string memory _tokenURI) external {
        require(!hasMinted[msg.sender], "Already minted");

        uint256 tokenId = tokenCounter;
        ownerOf[tokenId] = msg.sender;
        tokenURIs[tokenId] = _tokenURI;
        hasMinted[msg.sender] = true;

        emit Transfer(address(0), msg.sender, tokenId);
        tokenCounter++;
    }

    function checkIfMinted(address user) external view returns (bool) {
        return hasMinted[user];
    }

    function totalMinted() external view returns (uint256) {
        return tokenCounter - 1;
    }

    function tokenURI(uint256 tokenId) external view returns (string memory) {
        require(ownerOf[tokenId] != address(0), "Nonexistent token");
        return tokenURIs[tokenId];
    }
}
