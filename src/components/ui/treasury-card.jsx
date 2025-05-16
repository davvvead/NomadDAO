import { Landmark, ArrowUpRight, ArrowDownRight, RefreshCw } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function TreasuryCard() {
  const transactions = [
    {
      id: "tx-1",
      type: "deposit",
      amount: "+120 ROC",
      from: "0x8a3...45e2",
      description: "Community contribution",
      timestamp: "Today, 14:32",
    },
    {
      id: "tx-2",
      type: "withdraw",
      amount: "-50 ROC",
      from: "0x71c...8fe3",
      description: "Event sponsorship",
      timestamp: "Yesterday, 09:15",
    },
    {
      id: "tx-3",
      type: "deposit",
      amount: "+300 ROC",
      from: "0x3f5...92a1",
      description: "NFT sales revenue",
      timestamp: "May 12, 2023",
    },
    {
      id: "tx-4",
      type: "withdraw",
      amount: "-75 ROC",
      from: "0x71c...8fe3",
      description: "Developer grants",
      timestamp: "May 10, 2023",
    },
    {
      id: "tx-5",
      type: "swap",
      amount: "200 ROC → 0.5 ETH",
      from: "Treasury",
      description: "Token swap",
      timestamp: "May 8, 2023",
    },
  ]

  const getTransactionIcon = (type) => {
    switch (type) {
      case "deposit":
        return <ArrowUpRight size={16} className="text-green-400" />
      case "withdraw":
        return <ArrowDownRight size={16} className="text-red-400" />
      case "swap":
        return <RefreshCw size={16} className="text-blue-400" />
      default:
        return null
    }
  }

  const getAmountClass = (type) => {
    switch (type) {
      case "deposit":
        return "text-green-400"
      case "withdraw":
        return "text-red-400"
      case "swap":
        return "text-blue-400"
      default:
        return ""
    }
  }

  return (
    <div className="bg-zinc-900 rounded-lg border border-yellow-400/20 overflow-hidden h-full">
      <div className="p-5">
        <div className="flex items-start mb-4">
          <div className="w-10 h-10 bg-yellow-400/10 rounded-full flex items-center justify-center">
            <Landmark className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-medium text-yellow-400">Shared Treasury</h2>
            <p className="text-zinc-400 text-sm mt-1">
              Transparent funding for public goods. See how community funds are allocated and spent.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto mt-6">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-zinc-400 border-b border-zinc-800">
                <th className="pb-2 text-left font-medium">Transaction</th>
                <th className="pb-2 text-right font-medium">Amount</th>
                <th className="pb-2 text-right font-medium hidden sm:table-cell">From</th>
                <th className="pb-2 text-right font-medium hidden md:table-cell">Time</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/20 transition-colors">
                  <td className="py-3">
                    <div className="flex items-center">
                      <div className="p-1.5 rounded-md bg-zinc-800 mr-3">{getTransactionIcon(tx.type)}</div>
                      <div>
                        <p className="text-sm font-medium text-zinc-100">{tx.description}</p>
                        <p className="text-xs text-zinc-400 mt-0.5">{tx.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className={`py-3 text-right text-sm font-medium ${getAmountClass(tx.type)}`}>{tx.amount}</td>
                  <td className="py-3 text-right text-sm hidden sm:table-cell">
                    <div className="flex items-center justify-end">
                      <Avatar className="h-5 w-5 mr-1.5">
                        <AvatarFallback name={tx.from} variant="pixel" size={20} />
                      </Avatar>
                      <span className="text-zinc-400">{tx.from}</span>
                    </div>
                  </td>
                  <td className="py-3 text-right text-sm text-zinc-400 hidden md:table-cell">{tx.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button className="w-full mt-4 py-3 px-4 bg-zinc-800 rounded-lg font-medium text-zinc-100 hover:bg-zinc-700 transition-colors">
          View All Transactions
        </button>
      </div>
    </div>
  )
}
