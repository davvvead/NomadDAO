"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { checkConnection } from "@/utils/mintResidencyNFTs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WalletContext = createContext();

export function WalletProvider({ children }) {
  const [account, setAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Try to restore wallet connection
    const initializeWallet = async () => {
      try {
        if (window.ethereum) {
          const connection = await checkConnection();
          setAccount(connection.address);
        }
      } catch (error) {
        console.warn("Failed to restore wallet connection:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeWallet();

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount(null);
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

    // Cleanup listeners
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => {});
        window.ethereum.removeListener('chainChanged', () => {});
      }
    };
  }, []);

  const connect = async () => {
    try {
      if (!window.ethereum) {
        toast.error(<div>MetaMask is not installed. <span style={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer' }}>Click here to download MetaMask</span>.</div>, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          onClick: () => window.open('https://metamask.io/download.html', '_blank')
        });
        throw new Error("MetaMask is not installed.");
      }

      const connection = await checkConnection();
      setAccount(connection.address);
      return connection;
    } catch (error) {
      throw error;
    }
  };

  const disconnect = () => {
    setAccount(null);
  };

  return (
    <WalletContext.Provider value={{ 
      account, 
      isLoading, 
      connect, 
      disconnect 
    }}>
      {children}
      <ToastContainer />
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
} 