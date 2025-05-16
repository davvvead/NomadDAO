"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useWallet } from '@/context/WalletContext';

export default function ProtectedRoute({ children }) {
  const { account, isLoading, connect } = useWallet();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip protection for landing page
    if (pathname === '/') {
      return;
    }

    const connectWallet = async () => {
      try {
        // If not loading and no account, try to connect
        if (!isLoading && !account) {
          await connect();
        }
      } catch (error) {
        console.error("Failed to connect wallet:", error);
        router.push('/');
      }
    };

    connectWallet();
  }, [account, isLoading, connect, router, pathname]);

  // Show loading state while checking wallet
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500" />
      </div>
    );
  }

  // Allow access to landing page without wallet
  if (pathname === '/') {
    return children;
  }

  // Show children only if wallet is connected
  return account ? children : null;
} 