import Image from "next/image";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, FileText, MessageSquare, Twitter, ChevronRight, Wallet, Vote, Building2 } from "lucide-react"

export default function Home() {

  return (
    <div className="flex min-h-[100dvh] flex-col bg-black text-white">
      <header className="container mx-auto max-w-7xl flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
            NomadDAO
          </span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="#features" className="text-sm font-medium hover:text-green-400 transition-colors">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium hover:text-green-400 transition-colors">
            How It Works
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-green-400 transition-colors">
            Docs
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-green-400 transition-colors">
            Community
          </Link>
        </nav>
        <Button variant="outline" className="hidden md:flex border-green-500 text-green-400 hover:bg-green-500/10">
          Connect Wallet
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="md:hidden border-green-500 text-green-400 hover:bg-green-500/10"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Menu</span>
        </Button>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-6 md:gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
                    Shape Your City in the Metaverse
                  </h1>
                  <p className="max-w-[600px] text-zinc-400 md:text-xl">
                    Join virtual cities with Residency NFTs, vote on city upgrades through DAO proposals, and view a
                    shared treasury. Build the digital community you've always wanted.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-green-500 hover:bg-green-600 text-black font-bold">Mint Residency NFT</Button>
                  <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/10">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative aspect-square w-full max-w-[500px] overflow-hidden rounded-lg border border-green-500/20 bg-zinc-900">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-yellow-500/20 opacity-30"></div>
                  <Image
                    src="/skyline.gif"
                    alt="Virtual city visualization"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-1/3"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 bg-zinc-900/50">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-green-500/10 px-3 py-1 text-sm text-green-400">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Build Your Digital Community</h2>
                <p className="max-w-[900px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  NomadDAO provides all the tools digital nomads need to create thriving virtual communities.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              <div className="flex flex-col justify-center space-y-4 rounded-lg border border-green-500/20 bg-zinc-900 p-6 shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                  <Building2 className="h-6 w-6 text-green-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-green-400">Residency NFTs</h3>
                  <p className="text-zinc-400">
                    Join your city and earn voting rights. Your NFT is your digital passport to community governance.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 rounded-lg border border-green-500/20 bg-zinc-900 p-6 shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                  <Vote className="h-6 w-6 text-green-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-green-400">DAO Proposals</h3>
                  <p className="text-zinc-400">
                    Help govern upgrades to your community. Vote on proposals and shape the future of your virtual city.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 rounded-lg border border-green-500/20 bg-zinc-900 p-6 shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10">
                  <div className="h-6 w-6 text-yellow-400 flex items-center justify-center font-bold">$</div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-yellow-400">Shared Treasury</h3>
                  <p className="text-zinc-400">
                    Transparent funding for public goods. See how community funds are allocated and spent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-green-500/10 px-3 py-1 text-sm text-green-400">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Join in Three Simple Steps</h2>
                <p className="max-w-[900px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Getting started with NomadDAO is easy. Follow these steps to become part of the community.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              <div className="relative flex flex-col justify-center space-y-4">
                <div className="absolute -left-4 -top-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-black font-bold text-xl">
                  1
                </div>
                <div className="rounded-lg border border-green-500/20 bg-zinc-900 p-6 pt-8 shadow-lg">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                    <Wallet className="h-6 w-6 text-green-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Connect Wallet</h3>
                    <p className="text-zinc-400">
                      Connect your Web3 wallet to access the NomadDAO platform and verify your identity.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative flex flex-col justify-center space-y-4">
                <div className="absolute -left-4 -top-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-black font-bold text-xl">
                  2
                </div>
                <div className="rounded-lg border border-green-500/20 bg-zinc-900 p-6 pt-8 shadow-lg">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                    <Building2 className="h-6 w-6 text-green-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Mint NFT</h3>
                    <p className="text-zinc-400">
                      Choose your virtual city and mint a Residency NFT to become an official citizen.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative flex flex-col justify-center space-y-4">
                <div className="absolute -left-4 -top-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-black font-bold text-xl">
                  3
                </div>
                <div className="rounded-lg border border-green-500/20 bg-zinc-900 p-6 pt-8 shadow-lg">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                    <Vote className="h-6 w-6 text-green-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Vote & Build</h3>
                    <p className="text-zinc-400">
                      Participate in governance, vote on proposals, and help build your virtual community.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-zinc-900/50">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid items-center gap-6 px-4 text-center md:px-6">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Ready to Join the Movement?</h2>
                <p className="mx-auto max-w-[600px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Become a citizen of the metaverse today and help shape the future of digital communities.
                </p>
              </div>
              <div className="mx-auto flex flex-col gap-2 min-[400px]:flex-row justify-center">
                <Button className="bg-green-500 hover:bg-green-600 text-black font-bold">Mint Residency NFT</Button>
                <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/10">
                  Explore Cities
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t border-zinc-800 bg-black py-6">
        <div className="container mx-auto max-w-7xl flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
              NomadDAO
            </span>
            <p className="text-xs text-zinc-500">© 2025 NomadDAO. All rights reserved.</p>
          </div>
          <nav className="flex gap-4">
            <Link href="#" className="text-zinc-400 hover:text-green-400">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="#" className="text-zinc-400 hover:text-green-400">
              <FileText className="h-5 w-5" />
              <span className="sr-only">Docs</span>
            </Link>
            <Link href="#" className="text-zinc-400 hover:text-green-400">
              <MessageSquare className="h-5 w-5" />
              <span className="sr-only">Discord</span>
            </Link>
            <Link href="#" className="text-zinc-400 hover:text-green-400">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
