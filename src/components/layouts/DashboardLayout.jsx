"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/ui/sidebar";
import WalletConnect from "@/components/ui/WalletConnect";
import { useWallet } from "@/context/WalletContext";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { account, isLoading } = useWallet();
  const router = useRouter();

  useEffect(() => {
    // Redirect to landing page if no wallet is connected
    if (!isLoading && !account) {
      router.push('/');
    }
  }, [account, isLoading, router]);

  // Show loading state while checking wallet
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500" />
      </div>
    );
  }

  // Don't render anything if not connected (will redirect)
  if (!account) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Left side */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="block text-zinc-400 hover:text-white lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <WalletConnect />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
} 