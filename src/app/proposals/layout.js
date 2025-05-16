import { Geist, Geist_Mono } from "next/font/google";
import { WalletProvider } from '@/context/WalletContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NomadDAO - Digital Residency NFTs",
  description: "Mint and manage your digital residency NFTs in the NomadDAO ecosystem",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WalletProvider>
          <ProtectedRoute>
            {children}
          </ProtectedRoute>
        </WalletProvider>
      </body>
    </html>
  );
}
