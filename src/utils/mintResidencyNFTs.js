import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/config/contract";

// Helper function to check if MetaMask is properly connected
export async function checkConnection() {
    if (!window.ethereum) {
        throw new Error("MetaMask is not installed");
    }

    try {
        // Check if we're connected to Moonbase Alpha
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        const moonbaseAlphaChainId = '0x507'; // 1287 in hex

        if (chainId !== moonbaseAlphaChainId) {
            // Try to switch to Moonbase Alpha
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: moonbaseAlphaChainId }],
                });
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask
                if (switchError.code === 4902) {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: moonbaseAlphaChainId,
                            chainName: 'Moonbase Alpha',
                            nativeCurrency: {
                                name: 'DEV',
                                symbol: 'DEV',
                                decimals: 18
                            },
                            rpcUrls: ['https://rpc.api.moonbase.moonbeam.network'],
                            blockExplorerUrls: ['https://moonbase.moonscan.io/']
                        }]
                    });
                } else {
                    throw switchError;
                }
            }
        }

        // Get accounts
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        return { 
            address: accounts[0],
            chainId: chainId
        };
    } catch (error) {
        console.error("Connection error:", error);
        throw error;
    }
}

// Helper function to verify contract
export async function verifyContract() {
    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
        
        // Try to call some view functions
        const [name, symbol, counter] = await Promise.all([
            contract.name().catch(() => null),
            contract.symbol().catch(() => null),
            contract.tokenCounter().catch(() => null)
        ]);

        return {
            isDeployed: true,
            name,
            symbol,
            counter: counter ? counter.toString() : null,
            address: CONTRACT_ADDRESS
        };
    } catch (error) {
        console.error("Contract verification error:", error);
        return {
            isDeployed: false,
            error: error.message
        };
    }
}

export async function mint(tokenURI) {
    if (!window.ethereum) {
        throw new Error("MetaMask is not installed.");
    }

    try {
        // First verify connection and contract
        await checkConnection();
        const contractStatus = await verifyContract();
        if (!contractStatus.isDeployed) {
            throw new Error(`Contract not properly deployed: ${contractStatus.error}`);
        }

        // Connect to wallet
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();

        // Connect to contract
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        // Check if already minted using direct mapping access
        const alreadyMinted = await contract.hasMinted(userAddress);
        if (alreadyMinted) {
            const error = new Error("You've already minted your NFT. To mint another NFT, please use a different wallet address.");
            error.code = "ALREADY_MINTED";
            error.style = "error"; // This will be used for styling
            throw error;
        }

        console.log("Minting with URI:", tokenURI);
        
        // Send transaction
        const tx = await contract.mint(tokenURI);
        console.log("Transaction sent:", tx.hash);
        
        const receipt = await tx.wait();
        console.log("Transaction confirmed:", receipt);

        // Get the token ID from the transaction receipt
        if (receipt && receipt.logs && receipt.logs.length > 0) {
            // Find Transfer event
            const transferEvent = receipt.logs.find(log => {
                try {
                    return log && log.topics && log.topics[0] === ethers.id("Transfer(address,address,uint256)");
                } catch (e) {
                    return false;
                }
            });

            if (transferEvent && transferEvent.topics && transferEvent.topics.length >= 4) {
                const tokenId = parseInt(transferEvent.topics[3], 16);
                console.log("Minted token ID:", tokenId);
                return { 
                    tokenId, 
                    txHash: receipt.hash,
                    from: userAddress,
                    to: userAddress
                };
            }
        }

        // If we couldn't get the token ID from the event, return just the transaction hash
        return { 
            txHash: receipt.hash,
            from: userAddress,
            to: userAddress
        };
    } catch (error) {
        // Add styling information to other errors too
        if (!error.style) {
            error.style = "error";
        }
        console.error("Minting error:", error);
        throw error;
    }
}

export async function checkIfMinted(address) {
    if (!window.ethereum || !address) return false;

    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
        
        // Use direct mapping access
        const result = await contract.hasMinted(address);
        console.log("hasMinted result for", address, ":", result);
        return result;
    } catch (error) {
        console.error("Error checking mint status:", error);
        throw error;
    }
}

export async function getTotalMinted() {
    if (!window.ethereum) return 0;

    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
        return await contract.totalMinted();
    } catch (error) {
        console.error("Error getting total minted:", error);
        return 0;
    }
}

export async function getTokenURI(tokenId) {
    if (!window.ethereum) return null;

    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
        return await contract.tokenURI(tokenId);
    } catch (error) {
        console.error("Error getting token URI:", error);
        return null;
    }
}

// Helper function to get user-friendly error message
export function getMintErrorMessage(error) {
    if (error.code === "ALREADY_MINTED") {
        return {
            title: "Already Minted",
            message: error.message,
            solution: "Try connecting with a different wallet address that hasn't minted yet.",
            style: "error"
        };
    }

    if (error.code === "ACTION_REJECTED") {
        return {
            title: "Transaction Rejected",
            message: "You rejected the transaction in your wallet.",
            solution: "Try again and confirm the transaction in your wallet when prompted.",
            style: "warning"
        };
    }

    // Handle insufficient funds error
    if (error.message?.includes("insufficient funds")) {
        return {
            title: "Insufficient Funds",
            message: "You don't have enough DEV tokens to complete this transaction.",
            solution: "Get some DEV tokens from the Moonbase Alpha Faucet: https://faucet.moonbeam.network",
            style: "error"
        };
    }

    // Default error message
    return {
        title: "Error",
        message: error.message || "An unknown error occurred",
        solution: "Please try again or contact support if the issue persists.",
        style: "error"
    };
}
