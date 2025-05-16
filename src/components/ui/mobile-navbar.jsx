"use client"

import { Menu, Wallet } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function MobileNavbar({ setIsSidebarOpen }) {
  return (
    <div className="lg:hidden flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900">
      <div className="flex items-center">
        <button className="text-zinc-400 hover:text-white mr-3" onClick={() => setIsSidebarOpen(true)}>
          <Menu size={24} />
        </button>
        <h1 className="text-lg font-bold text-green-400">NomadDAO</h1>
      </div>

      <div className="flex items-center space-x-3">
        <div className="flex items-center bg-zinc-800 rounded-full px-3 py-1">
          <Wallet size={14} className="text-green-400 mr-2" />
          <span className="text-xs">0x71C...8Fe3</span>
        </div>
        <Avatar className="h-8 w-8">
          <AvatarFallback name="nomad-user" variant="beam" />
        </Avatar>
      </div>
    </div>
  )
}
