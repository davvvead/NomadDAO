import { Users, Wallet, Landmark, FileText } from "lucide-react"

export default function OverviewSection() {
  const stats = [
    {
      title: "Active Residents",
      value: "3,721",
      icon: Users,
      color: "from-green-400 to-green-600",
    },
    {
      title: "Treasury Balance",
      value: "1,234 ROC",
      icon: Landmark,
      color: "from-yellow-400 to-yellow-600",
    },
    {
      title: "Your Balance",
      value: "45.8 ROC",
      icon: Wallet,
      color: "from-green-400 to-yellow-400",
    },
    {
      title: "Total Proposals",
      value: "28",
      icon: FileText,
      color: "from-yellow-400 to-green-400",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-zinc-800 rounded-xl p-4 border border-zinc-700 hover:border-zinc-600 transition-colors shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-zinc-400">{stat.title}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
            <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-10`}>
              <stat.icon size={20} className="text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
