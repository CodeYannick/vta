import { ArrowLeft, Search, Trophy } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'

export default function RankingsPage() {
  const navigate = useNavigate()

  const rankings = [
    { rank: 1, name: "李林峰", points: 1250, tier: "钻石 II", change: 0, avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=250&auto=format&fit=crop" },
    { rank: 2, name: "王大锤", points: 1180, tier: "钻石 III", change: 1, avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=250&auto=format&fit=crop" },
    { rank: 3, name: "张小雨", points: 1150, tier: "白金 I", change: -1, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250&auto=format&fit=crop" },
    { rank: 4, name: "陈子豪", points: 1020, tier: "白金 II", change: 2, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=250&auto=format&fit=crop" },
    { rank: 5, name: "刘梦", points: 980, tier: "白金 II", change: 0, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=250&auto=format&fit=crop" },
    { rank: 6, name: "赵四", points: 950, tier: "白金 III", change: -2, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=250&auto=format&fit=crop" },
    { rank: 7, name: "孙悟空", points: 900, tier: "黄金 I", change: 5, avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=250&auto=format&fit=crop" },
    { rank: 8, name: "猪八戒", points: 880, tier: "黄金 I", change: -1, avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=250&auto=format&fit=crop" },
    { rank: 9, name: "沙悟净", points: 850, tier: "黄金 II", change: 0, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&auto=format&fit=crop" },
    { rank: 10, name: "唐僧", points: 820, tier: "黄金 II", change: 0, avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=250&auto=format&fit=crop" },
  ]

  return (
    <div className="bg-gray-50 min-h-full flex flex-col">
      {/* Header */}
      <div className="bg-vta-dark text-white p-4 sticky top-0 z-40">
        <div className="flex items-center justify-between mb-4">
            <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center">
                <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-bold">积分排行榜</h1>
            <div className="w-8"></div>
        </div>
        
        {/* Search Bar */}
        <div className="bg-white/10 rounded-full flex items-center px-3 py-2">
            <Search size={16} className="text-gray-400 mr-2" />
            <input 
                type="text" 
                placeholder="搜索选手姓名..." 
                className="bg-transparent border-none outline-none text-sm text-white w-full placeholder-gray-400"
            />
        </div>
      </div>

      {/* List Header */}
      <div className="bg-white px-4 py-2 flex text-xs text-gray-500 border-b border-gray-100 sticky top-[108px] z-30">
        <div className="w-10 text-center">排名</div>
        <div className="flex-1 pl-4">选手</div>
        <div className="w-20 text-right">积分</div>
      </div>

      {/* List */}
      <div className="bg-white flex-1 pb-20">
        {rankings.map((player) => (
            <div key={player.rank} className={cn(
                "flex items-center px-4 py-3 border-b border-gray-50",
                player.rank === 1 && "bg-yellow-50/30" // Highlight top 1 slightly
            )}>
                <div className="w-10 flex justify-center">
                    {player.rank <= 3 ? (
                        <div className={cn(
                            "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white",
                            player.rank === 1 ? "bg-vta-gold" :
                            player.rank === 2 ? "bg-gray-400" :
                            "bg-orange-400"
                        )}>
                            {player.rank}
                        </div>
                    ) : (
                        <span className="text-gray-500 font-medium text-sm">{player.rank}</span>
                    )}
                </div>
                
                <div className="flex-1 pl-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3 border border-gray-100">
                        <img src={player.avatar} alt={player.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <div className="flex items-center">
                            <span className="font-bold text-slate-800 text-sm mr-2">{player.name}</span>
                            {player.rank === 1 && <Trophy size={12} className="text-vta-gold fill-current" />}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">{player.tier}</div>
                    </div>
                </div>

                <div className="w-20 text-right">
                    <div className="font-bold text-vta-green text-lg leading-none">{player.points}</div>
                    <div className={cn(
                        "text-[10px] mt-1 scale-90 origin-right",
                        player.change > 0 ? "text-red-500" : 
                        player.change < 0 ? "text-green-500" : "text-gray-300"
                    )}>
                        {player.change > 0 ? `▲ ${player.change}` : 
                         player.change < 0 ? `▼ ${Math.abs(player.change)}` : '-'}
                    </div>
                </div>
            </div>
        ))}
      </div>

      {/* Current User Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-vta-dark text-white p-4 pb-safe flex items-center shadow-2xl border-t border-white/10">
          <div className="w-10 text-center font-bold text-lg text-vta-gold">1</div>
          <div className="flex-1 pl-4 flex items-center">
             <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden mr-3 border-2 border-vta-gold">
                <img src={rankings[0].avatar} alt="Me" className="w-full h-full object-cover" />
             </div>
             <div>
                <div className="font-bold text-white text-sm">我 (李林峰)</div>
                <div className="text-xs text-gray-400">钻石 II</div>
             </div>
          </div>
          <div className="w-20 text-right">
              <div className="font-bold text-vta-gold text-lg">1250</div>
              <div className="text-[10px] text-gray-400">距离下一名 -</div>
          </div>
      </div>
    </div>
  )
}
