import { ArrowLeft, Trophy, Calendar, MapPin, Share2, Crown } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { cn } from '@/lib/utils'

export default function MatchReportPage() {
  const navigate = useNavigate()
  const { id } = useParams()

  // Mock Data
  const match = {
    id: id,
    title: "VTA 新星杯单打赛",
    date: "2026-01-15",
    location: "朝阳公园网球中心",
    level: "青铜",
    champion: {
      name: "张小雨",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250&auto=format&fit=crop",
      score: "6-4"
    },
    runnerUp: {
      name: "王二狗",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=250&auto=format&fit=crop"
    },
    rounds: [
      {
        name: "决赛",
        matches: [
          { p1: "张小雨", p2: "王二狗", score: "6-4", winner: 1 }
        ]
      },
      {
        name: "半决赛",
        matches: [
          { p1: "张小雨", p2: "李铁柱", score: "6-2", winner: 1 },
          { p1: "王二狗", p2: "赵翠花", score: "7-5", winner: 1 }
        ]
      }
    ]
  }

  return (
    <div className="bg-gray-50 min-h-full">
      {/* Header */}
      <div className="bg-vta-dark text-white relative">
        <div className="px-4 py-3 flex items-center justify-between sticky top-0 z-10">
          <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full backdrop-blur-sm">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-base font-bold">赛事战报</h1>
          <button className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full backdrop-blur-sm">
            <Share2 size={18} />
          </button>
        </div>

        <div className="p-6 text-center pb-12">
           <h2 className="text-xl font-bold mb-2">{match.title}</h2>
           <div className="flex justify-center items-center text-xs text-gray-400 space-x-3">
              <span className="flex items-center"><Calendar size={12} className="mr-1"/> {match.date}</span>
              <span className="flex items-center"><MapPin size={12} className="mr-1"/> {match.location}</span>
           </div>
        </div>

        {/* Champion Card */}
        <div className="absolute -bottom-16 left-4 right-4 bg-gradient-to-br from-yellow-100 to-white text-slate-800 rounded-2xl p-4 shadow-xl flex items-center justify-between">
           <div className="flex items-center">
              <div className="flex flex-col items-center relative">
                 <div className="absolute -top-5 z-10 text-vta-gold filter drop-shadow-sm">
                    <Crown size={20} fill="currentColor" />
                 </div>
                 <div className="w-16 h-16 rounded-full border-2 border-vta-gold overflow-hidden relative">
                    <img src={match.champion.avatar} alt="Champion" className="w-full h-full object-cover" />
                 </div>
                 <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-vta-gold text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm whitespace-nowrap">
                    冠军
                 </div>
              </div>
              <div className="ml-3">
                 <div className="font-bold text-lg">{match.champion.name}</div>
                 <div className="text-xs text-gray-500">决赛比分: <span className="font-bold text-vta-green">{match.champion.score}</span></div>
              </div>
           </div>
           <div className="text-center">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">Points</div>
              <div className="text-xl font-bold text-vta-gold">+500</div>
           </div>
        </div>
      </div>

      <div className="mt-20 px-4 space-y-6 pb-10">
         {/* Podium */}
         <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center">
               <Trophy size={16} className="text-gray-400 mr-2" /> 荣誉榜
            </h3>
            <div className="flex items-end justify-center space-x-4 text-center">
               <div className="flex flex-col items-center relative">
                  <div className="absolute -top-5 z-10 text-slate-400 filter drop-shadow-sm">
                     <Crown size={20} fill="#B1B1B1" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-slate-300 overflow-hidden mb-2">
                     <img src={match.runnerUp.avatar} alt="Runner Up" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-xs font-bold text-gray-600">亚军</div>
                  <div className="text-[10px] text-gray-400">{match.runnerUp.name}</div>
                  <div className="h-16 w-16 bg-gray-100 rounded-t-lg mt-2 flex items-center justify-center text-gray-300 font-bold text-2xl">2</div>
               </div>
               <div className="flex flex-col items-center z-10 -mx-2 relative">
                  <div className="absolute -top-6 z-10 text-vta-gold filter drop-shadow-sm">
                     <Crown size={28} fill="currentColor" />
                  </div>
                  <div className="w-16 h-16 rounded-full bg-yellow-100 border-2 border-vta-gold overflow-hidden mb-2 shadow-lg">
                     <img src={match.champion.avatar} alt="Champion" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-xs font-bold text-vta-gold">冠军</div>
                  <div className="text-[10px] text-gray-400">{match.champion.name}</div>
                  <div className="h-24 w-20 bg-gradient-to-b from-vta-gold/20 to-gray-50 rounded-t-lg mt-2 flex items-center justify-center text-vta-gold font-bold text-4xl">1</div>
               </div>
               <div className="flex flex-col items-center relative">
                  <div className="absolute -top-5 z-10 text-orange-500 filter drop-shadow-sm">
                     <Crown size={20} fill="currentColor" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-orange-100 border-2 border-orange-300 overflow-hidden mb-2">
                     <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=250&auto=format&fit=crop" alt="Third Place" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-xs font-bold text-orange-600">四强</div>
                  <div className="text-[10px] text-gray-400">李铁柱</div>
                  <div className="h-12 w-16 bg-gray-50 rounded-t-lg mt-2 flex items-center justify-center text-gray-300 font-bold text-xl">3</div>
               </div>
            </div>
         </div>

         {/* Scores */}
         {match.rounds.map((round, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
               <div className="bg-gray-50 px-4 py-2 text-xs font-bold text-gray-500 border-b border-gray-100">
                  {round.name}
               </div>
               <div className="divide-y divide-gray-50">
                  {round.matches.map((m, i) => (
                     <div key={i} className="px-4 py-3 flex items-center justify-between">
                        <div className={cn("flex-1 text-sm", m.winner === 1 ? "font-bold text-slate-800" : "text-gray-500")}>
                           {m.p1}
                        </div>
                        <div className="px-4 font-mono font-bold text-vta-green">{m.score}</div>
                        <div className={cn("flex-1 text-sm text-right", m.winner === 2 ? "font-bold text-slate-800" : "text-gray-500")}>
                           {m.p2}
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         ))}
      </div>
    </div>
  )
}
