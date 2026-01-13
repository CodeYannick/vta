import { ChevronRight, Info, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function CareerPage() {
  const player = {
    name: "李林峰",
    nameEn: "LI LINFENG",
    gender: "男",
    rank: 1,
    points: 1250,
    tier: "钻石 II",
    nextTier: "钻石 I",
    pointsToNext: 150,
    stats: {
      matches: "30/10",
      winRate: "75%",
      champions: 3,
      constellation: "射手座"
    }
  }

  // Calculate progress to next tier
  const progress = 70 // 70%

  return (
    <div className="bg-vta-dark min-h-full text-white pb-20">
      {/* Header Profile Area */}
      <div className="bg-vta-green p-6 pt-10 rounded-b-[2.5rem] relative shadow-2xl">
        <div className="flex items-start justify-between mb-6">
           <div>
             <h1 className="text-2xl font-bold italic tracking-wider">{player.nameEn}</h1>
             <div className="flex items-baseline space-x-2 mt-1">
               <span className="text-xl font-medium">{player.name}</span>
               <span className="text-xs opacity-60 bg-white/10 px-1.5 py-0.5 rounded">{player.gender} MALE</span>
             </div>
           </div>
           {/* Avatar */}
           <div className="w-20 h-20 rounded-full border-2 border-vta-gold shadow-lg bg-gray-800 overflow-hidden relative">
             <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=250&auto=format&fit=crop" alt="Avatar" className="w-full h-full object-cover" />
             <div className="absolute bottom-0 left-0 right-0 bg-vta-gold text-[8px] text-center text-black font-bold py-0.5">
               VTA NO.{player.rank}
             </div>
           </div>
        </div>

        {/* Tier Progress (New Feature) */}
        <div className="bg-black/20 rounded-xl p-4 mb-6 backdrop-blur-sm border border-white/5">
           <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-vta-gold flex items-center">
                 <Star size={12} className="mr-1 fill-vta-gold" />
                 {player.tier}
              </span>
              <span className="text-[10px] text-gray-300">
                 距离 {player.nextTier} 还差 <span className="text-white font-bold">{player.pointsToNext}</span> 分
              </span>
           </div>
           {/* Progress Bar */}
           <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-vta-gold to-yellow-200" 
                style={{ width: `${progress}%` }}
              ></div>
           </div>
           <div className="mt-2 text-[10px] text-gray-400 flex items-center">
              <Info size={10} className="mr-1" />
              <span>晋级建议：参加本周六 3.0 大师赛，进入四强即可晋级</span>
           </div>
        </div>

        {/* Core Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
           <StatCard label="当前排名" value={player.rank} isGold />
           <StatCard label="单打冠军" value={player.stats.champions} />
           <StatCard label="星座战队" value={player.stats.constellation} icon="🏹" />
           <StatCard label="胜负场次" value={player.stats.matches} />
           <StatCard label="赛季胜率" value={player.stats.winRate} />
           <StatCard label="当前段位" value="💎" sub="钻石组" />
        </div>
      </div>

      {/* Constellation Visual (Static for MVP) */}
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-4">
           <h2 className="text-lg font-bold">我的星图</h2>
           <button className="text-xs text-vta-gold border border-vta-gold/30 px-2 py-1 rounded-full">查看规则</button>
        </div>
        
        {/* Mock Constellation SVG */}
        <div className="aspect-square bg-[#0f1218] rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center">
           {/* Background Galaxy Effect */}
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-[#0f1218] to-[#0f1218]"></div>
           
           {/* Stars Connection */}
           <svg viewBox="0 0 200 200" className="w-full h-full absolute inset-0 p-8">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              {/* Lines */}
              <path d="M40,160 L70,120 L100,100 L140,80 L170,40" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <path d="M100,100 L130,130" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              
              {/* Stars (Active) */}
              <circle cx="40" cy="160" r="6" fill="#1E4620" stroke="white" strokeWidth="2" />
              <circle cx="70" cy="120" r="6" fill="#1E4620" stroke="white" strokeWidth="2" />
              <circle cx="100" cy="100" r="8" fill="#D4AF37" stroke="white" strokeWidth="2" filter="url(#glow)" /> {/* Main Star */}
              
              {/* Stars (Inactive) */}
              <circle cx="140" cy="80" r="5" fill="#333" stroke="#666" strokeWidth="1" />
              <circle cx="170" cy="40" r="5" fill="#333" stroke="#666" strokeWidth="1" />
              <circle cx="130" cy="130" r="5" fill="#333" stroke="#666" strokeWidth="1" />
           </svg>

           {/* Labels */}
           <div className="absolute bottom-4 text-center">
              <span className="text-vta-gold font-bold tracking-[0.2em] text-sm">SAGITTARIUS</span>
              <div className="text-[10px] text-gray-500">射手座 · 进度 3/6</div>
           </div>
        </div>
      </div>

      {/* Basic Info List */}
      <div className="px-6 space-y-4 text-sm">
         <div className="bg-white/5 rounded-xl p-4 space-y-3">
            <InfoRow label="加入VTA时间" value="2024年" />
            <InfoRow label="持拍手" value="右手正拍，双手反拍" />
            <InfoRow label="基本打法" value="底线攻击型" />
         </div>
         
         <div className="flex justify-center pt-4">
            <button className="text-xs text-gray-500 flex items-center">
               查看完整生涯数据 <ChevronRight size={12} />
            </button>
         </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, icon, sub, isGold }: any) {
  return (
    <div className={cn(
      "rounded-lg p-2 text-center flex flex-col items-center justify-center h-20 border",
      isGold 
        ? "bg-vta-gold text-black border-vta-gold" 
        : "bg-vta-green border-white/10 text-white"
    )}>
       <div className="text-[10px] opacity-70 mb-1">{label}</div>
       <div className="font-bold text-lg leading-none">
          {icon && <span className="mr-1 text-sm">{icon}</span>}
          {value}
       </div>
       {sub && <div className="text-[8px] opacity-80 mt-1">{sub}</div>}
    </div>
  )
}

function InfoRow({ label, value }: any) {
   return (
      <div className="flex justify-between items-center border-b border-white/5 last:border-0 pb-2 last:pb-0">
         <span className="text-gray-400">{label}</span>
         <span className="text-white font-medium">{value}</span>
      </div>
   )
}
