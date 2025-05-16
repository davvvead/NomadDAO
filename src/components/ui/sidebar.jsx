"use client"

import { Home, Coins, Vote, Landmark, Users, X } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import BoringAvatar from "boring-avatars"
import WalletConnect from "./WalletConnect"

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const pathname = usePathname()
  
  const navItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Residency NFTs", icon: Coins, path: "/residency-nfts" },
    { name: "DAO Proposals", icon: Vote, path: "/proposals" },
    { name: "Shared Treasury", icon: Landmark, path: "/treasury" },
    { name: "Community", icon: Users, path: "/community" },
  ]

  // Check if path is active (handles both exact matches and sub-paths)
  const isActivePath = (path) => {
    if (path === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(path)
  }

  return (
    <>
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-20 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out bg-zinc-900 border-r border-zinc-800 flex flex-col ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Close button - mobile only */}
        <button
          className="absolute top-4 right-4 lg:hidden text-zinc-400 hover:text-white"
          onClick={() => setIsSidebarOpen(false)}
        >
          <X size={20} />
        </button>

        {/* Logo */}
        <Link href="/" className="p-6 border-b border-zinc-800">
          <h1 className="text-xl font-bold text-green-400">NomadDAO</h1>
        </Link>

        {/* Nav Items */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = isActivePath(item.path)
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-green-400/10 text-green-400 border border-green-400/20"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    setIsSidebarOpen(false)
                  }
                }}
              >
                <item.icon size={18} className={isActive ? "text-green-400" : ""} />
                <span className="ml-3">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-zinc-800">
          <WalletConnect variant="sidebar" />
        </div>
      </aside>
    </>
  )
}
