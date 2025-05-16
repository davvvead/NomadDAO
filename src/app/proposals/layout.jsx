"use client"

import { WalletProvider } from '@/context/WalletContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import DashboardLayout from '@/components/layouts/DashboardLayout'

export default function ProposalsLayout({ children }) {
  return (
    <WalletProvider>
      <ProtectedRoute>
        <DashboardLayout>
          {children}
        </DashboardLayout>
      </ProtectedRoute>
    </WalletProvider>
  )
} 