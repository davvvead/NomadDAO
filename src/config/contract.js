// Contract details (Moonbase Alpha)
export const CONTRACT_ADDRESS = "0x74291452A977636C3965625c4462919f144Ee589";

// Complete ABI for the NFT contract
export const CONTRACT_ABI = [
    // Public state variables
    "function name() public view returns (string)",
    "function symbol() public view returns (string)",
    "function tokenCounter() public view returns (uint256)",
    "function ownerOf(uint256) public view returns (address)",
    "function hasMinted(address) public view returns (bool)",
    "function tokenURIs(uint256) public view returns (string)",
    
    // Functions
    "function mint(string calldata _tokenURI) external",
    "function totalMinted() external view returns (uint256)",
    "function tokenURI(uint256 tokenId) external view returns (string memory)",
    
    // Events
    "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
]; 