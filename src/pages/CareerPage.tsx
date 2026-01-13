import { ChevronRight, Info, Star, ArrowLeft, Activity, History, TrendingUp, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export default function CareerPage() {
  const [showDetails, setShowDetails] = useState(false)
  const [showRules, setShowRules] = useState(false)
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
             <img src="https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=250&auto=format&fit=crop" alt="Avatar" className="w-full h-full object-cover" />
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
              <span>晋级建议：参加本周六 钻石赛，进入四强即可晋级</span>
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
           <button 
             onClick={() => setShowRules(true)}
             className="text-xs text-vta-gold border border-vta-gold/30 px-2 py-1 rounded-full active:bg-vta-gold/10 transition-colors"
           >
             查看规则
           </button>
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
            <button 
              onClick={() => setShowDetails(true)}
              className="text-xs text-gray-500 flex items-center hover:text-white transition-colors"
            >
               查看完整生涯数据 <ChevronRight size={12} />
            </button>
         </div>
      </div>

      {/* Full Screen Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 z-50 bg-gray-50 overflow-y-auto animate-in slide-in-from-bottom duration-300">
           {/* Header */}
           <div className="bg-white sticky top-0 z-10 px-4 py-3 flex items-center justify-between border-b border-gray-100 shadow-sm">
              <button onClick={() => setShowDetails(false)} className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-full">
                 <ArrowLeft size={18} className="text-slate-800" />
              </button>
              <h2 className="text-base font-bold text-slate-800">生涯详细数据</h2>
              <div className="w-8"></div>
           </div>

           <div className="p-4 space-y-6 pb-10">
              {/* Radar Chart Section */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                 <div className="flex items-center mb-6">
                    <Activity size={18} className="text-vta-green mr-2" />
                    <h3 className="font-bold text-slate-800">技术六维图</h3>
                 </div>
                 <div className="aspect-square relative flex items-center justify-center">
                    <RadarChart 
                       data={[85, 75, 60, 90, 70, 80]} 
                       labels={['正手', '反手', '网前', '体能', '心态', '发球']} 
                    />
                 </div>
                 <div className="mt-4 text-center">
                    <p className="text-xs text-gray-400">基于最近 20 场比赛数据分析</p>
                 </div>
              </div>

              {/* Detailed Stats Grid */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                 <div className="flex items-center mb-4">
                    <TrendingUp size={18} className="text-vta-green mr-2" />
                    <h3 className="font-bold text-slate-800">关键数据</h3>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <DetailStatItem label="ACE 球" value="124" />
                    <DetailStatItem label="双误" value="45" />
                    <DetailStatItem label="一发进球率" value="62%" />
                    <DetailStatItem label="一发得分率" value="70%" />
                    <DetailStatItem label="二发得分率" value="55%" />
                    <DetailStatItem label="挽救破发点" value="65%" />
                    <DetailStatItem label="制胜分" value="342" />
                    <DetailStatItem label="非受迫性失误" value="189" />
                 </div>
              </div>

              {/* Match History */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                 <div className="flex items-center mb-4">
                    <History size={18} className="text-vta-green mr-2" />
                    <h3 className="font-bold text-slate-800">近期战绩</h3>
                 </div>
                 <div className="space-y-4">
                    <MatchHistoryItem 
                       result="win" 
                       score="6-4, 6-2" 
                       opponent="王大锤" 
                       date="2026-01-10" 
                       event="VTA 周末赛"
                    />
                    <MatchHistoryItem 
                       result="loss" 
                       score="4-6, 5-7" 
                       opponent="张小雨" 
                       date="2026-01-03" 
                       event="VTA 大师赛"
                    />
                    <MatchHistoryItem 
                       result="win" 
                       score="7-5, 6-4" 
                       opponent="陈子豪" 
                       date="2025-12-28" 
                       event="年终总决赛"
                    />
                    <MatchHistoryItem 
                       result="win" 
                       score="6-0, 6-1" 
                       opponent="刘梦" 
                       date="2025-12-20" 
                       event="VTA 周末赛"
                    />
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Rules Modal */}
      {showRules && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowRules(false)}></div>
           <div className="bg-white rounded-2xl w-full max-w-sm relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="bg-vta-dark p-4 flex justify-between items-center">
                 <h3 className="text-white font-bold text-lg flex items-center">
                    <Star size={18} className="text-vta-gold mr-2 fill-vta-gold" /> 星图规则
                 </h3>
                 <button onClick={() => setShowRules(false)} className="text-white/60 hover:text-white">
                    <X size={20} />
                 </button>
              </div>
              <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                 <div>
                    <h4 className="font-bold text-slate-800 mb-2 flex items-center text-sm">
                       <span className="w-1.5 h-1.5 rounded-full bg-vta-green mr-2"></span>
                       什么是星图？
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                       星图是 VTA 选手的荣耀象征。每个星座代表一个赛季周期，星图上的星星代表您在该赛季取得的成就节点。
                    </p>
                 </div>
                 
                 <div>
                    <h4 className="font-bold text-slate-800 mb-2 flex items-center text-sm">
                       <span className="w-1.5 h-1.5 rounded-full bg-vta-green mr-2"></span>
                       如何点亮星星？
                    </h4>
                    <ul className="text-xs text-gray-500 space-y-2 leading-relaxed">
                       <li className="flex items-start">
                          <span className="text-vta-gold mr-1.5">●</span> 参加一场大师赛 (+1星)
                       </li>
                       <li className="flex items-start">
                          <span className="text-vta-gold mr-1.5">●</span> 获得一次周末挑战赛冠军 (+1星)
                       </li>
                       <li className="flex items-start">
                          <span className="text-vta-gold mr-1.5">●</span> 累计胜场达到 10 场 (+1星)
                       </li>
                       <li className="flex items-start">
                          <span className="text-vta-gold mr-1.5">●</span> 击败排名高于自己的对手 (+1星)
                       </li>
                    </ul>
                 </div>

                 <div>
                    <h4 className="font-bold text-slate-800 mb-2 flex items-center text-sm">
                       <span className="w-1.5 h-1.5 rounded-full bg-vta-green mr-2"></span>
                       集齐奖励
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                       当您点亮当前星座的所有星星后，将获得 <span className="font-bold text-vta-gold">限定头像框</span> 及 <span className="font-bold text-vta-gold">年终总决赛直通卡</span>。
                    </p>
                 </div>
              </div>
              <div className="p-4 border-t border-gray-100">
                 <button 
                    onClick={() => setShowRules(false)}
                    className="w-full bg-vta-green text-white py-2.5 rounded-full font-bold text-sm shadow-lg shadow-vta-green/30"
                 >
                    我明白了
                 </button>
              </div>
           </div>
        </div>
      )}

    </div>
  )
}

// Helper Components for Details View

function RadarChart({ data, labels }: { data: number[], labels: string[] }) {
   // Simple SVG Radar Chart implementation
   // Data expected to be 0-100
   const size = 200
   const center = size / 2
   const radius = 80
   
   // Calculate points
   const points = data.map((value, i) => {
      const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2
      const r = (value / 100) * radius
      const x = center + r * Math.cos(angle)
      const y = center + r * Math.sin(angle)
      return `${x},${y}`
   }).join(' ')

   const backgroundPoints = [100, 75, 50, 25].map(p => {
      return Array(6).fill(p).map((val, i) => {
         const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2
         const r = (val / 100) * radius
         const x = center + r * Math.cos(angle)
         const y = center + r * Math.sin(angle)
         return `${x},${y}`
      }).join(' ')
   })

   // Axis lines
   const axes = Array(6).fill(0).map((_, i) => {
      const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2
      const x = center + radius * Math.cos(angle)
      const y = center + radius * Math.sin(angle)
      return <line key={i} x1={center} y1={center} x2={x} y2={y} stroke="#e5e7eb" strokeWidth="1" />
   })

   // Labels
   const labelElements = labels.map((label, i) => {
      const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2
      const r = radius + 20
      const x = center + r * Math.cos(angle)
      const y = center + r * Math.sin(angle)
      return (
         <text 
            key={i} 
            x={x} 
            y={y} 
            textAnchor="middle" 
            dominantBaseline="middle" 
            className="text-[10px] fill-gray-500 font-medium"
         >
            {label}
         </text>
      )
   })

   return (
      <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`}>
         {/* Background Grid */}
         {backgroundPoints.map((pts, i) => (
            <polygon key={i} points={pts} fill="none" stroke="#e5e7eb" strokeWidth="1" />
         ))}
         {axes}
         
         {/* Data Polygon */}
         <polygon points={points} fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2" />
         
         {/* Data Points */}
         {data.map((value, i) => {
            const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2
            const r = (value / 100) * radius
            const x = center + r * Math.cos(angle)
            const y = center + r * Math.sin(angle)
            return <circle key={i} cx={x} cy={y} r="3" fill="#22c55e" stroke="white" strokeWidth="1" />
         })}

         {labelElements}
      </svg>
   )
}

function DetailStatItem({ label, value }: { label: string, value: string }) {
   return (
      <div className="bg-gray-50 rounded-lg p-3 text-center">
         <div className="text-xs text-gray-500 mb-1">{label}</div>
         <div className="text-lg font-bold text-slate-800">{value}</div>
      </div>
   )
}

function MatchHistoryItem({ result, score, opponent, date, event }: any) {
   return (
      <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
         <div className="flex items-center space-x-3">
            <div className={cn(
               "w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold text-white",
               result === 'win' ? "bg-vta-green" : "bg-red-500"
            )}>
               {result === 'win' ? 'W' : 'L'}
            </div>
            <div>
               <div className="text-sm font-bold text-slate-800">vs {opponent}</div>
               <div className="text-[10px] text-gray-400">{event} · {date}</div>
            </div>
         </div>
         <div className="text-sm font-mono font-medium text-slate-600">
            {score}
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
