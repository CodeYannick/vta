import { useState, useEffect } from 'react'
import { Calendar, MapPin, Filter, ArrowUpDown, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'

export default function TournamentsPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'register' | 'ongoing' | 'completed'>('register')
  const [sortConfig, setSortConfig] = useState<{ key: 'date' | 'level' | null, direction: 'asc' | 'desc' }>({ key: null, direction: 'asc' })

  const tournaments = [
    {
      id: 1,
      title: "2026年冬季网球大师赛",
      date: "2026-01-20 19:00",
      location: "北京市海淀区中关村网球馆",
      status: "register", // register, ongoing, completed
      statusText: "报名中",
      level: "白银",
      signed: 24,
      total: 32,
      price: "¥120",
      image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=2070&auto=format&fit=crop",
      deadline: "2026-01-18T12:00:00"
    },
    {
      id: 2,
      title: "VTA 周末挑战赛 (第45期)",
      date: "2026-01-24 14:00",
      location: "国家网球中心",
      status: "register",
      statusText: "报名中",
      level: "钻石",
      signed: 8,
      total: 16,
      price: "¥100",
      image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=2070&auto=format&fit=crop",
      deadline: "2026-01-23T18:00:00"
    },
    {
      id: 3,
      title: "VTA 新星杯单打赛",
      date: "2026-01-15 10:00",
      location: "朝阳公园网球中心",
      status: "completed",
      statusText: "已完赛",
      level: "青铜",
      signed: 16,
      total: 16,
      price: "¥80",
      image: "https://images.unsplash.com/photo-1519163219899-21d2bb723b3e?q=80&w=2070&auto=format&fit=crop",
      deadline: "2026-01-14T00:00:00"
    }
  ]

  const filteredTournaments = tournaments
    .filter(t => {
      if (activeTab === 'register') return t.status === 'register'
      if (activeTab === 'ongoing') return t.status === 'ongoing'
      if (activeTab === 'completed') return t.status === 'completed'
      return true
    })
    .sort((a, b) => {
      if (!sortConfig.key) return 0
      
      let aValue = a[sortConfig.key as keyof typeof a]
      let bValue = b[sortConfig.key as keyof typeof b]

      // Handle date string comparison
      if (sortConfig.key === 'date') {
        return sortConfig.direction === 'asc' 
          ? new Date(aValue).getTime() - new Date(bValue).getTime()
          : new Date(bValue).getTime() - new Date(aValue).getTime()
      }

      if (sortConfig.key === 'level') {
         const levelOrder = { "大满贯": 4, "钻石": 3, "白银": 2, "青铜": 1 }
         const aLevel = aValue as keyof typeof levelOrder
         const bLevel = bValue as keyof typeof levelOrder
         return sortConfig.direction === 'asc'
          ? (levelOrder[aLevel] || 0) - (levelOrder[bLevel] || 0)
          : (levelOrder[bLevel] || 0) - (levelOrder[aLevel] || 0)
      }

      return 0
    })

  const handleSort = (key: 'date' | 'level') => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const resetFilters = () => {
    setSortConfig({ key: null, direction: 'asc' })
  }

  return (
    <div className="bg-gray-50 min-h-full pb-20">
      {/* Header */}
      <div className="bg-vta-dark text-white p-4 sticky top-0 z-40">
        <h1 className="text-lg font-bold text-center">赛事中心</h1>
      </div>

      {/* Filter Bar */}
      <div className="bg-white px-4 py-2 flex items-center justify-between border-b border-gray-100 sticky top-[60px] z-30">
        <div className="flex space-x-4 text-xs font-medium text-gray-600">
           <button 
             className={cn("flex items-center", sortConfig.key === 'level' && "text-vta-green")}
             onClick={() => handleSort('level')}
           >
             赛事级别 <Filter size={10} className="ml-1" />
           </button>
           <button 
             className={cn("flex items-center", sortConfig.key === 'date' && "text-vta-green")}
             onClick={() => handleSort('date')}
           >
             赛事日期 <Calendar size={10} className="ml-1" />
           </button>
           <button className="flex items-center text-gray-400 cursor-not-allowed">
             比赛项目 <ArrowUpDown size={10} className="ml-1" />
           </button>
        </div>
        <button className="text-[10px] text-gray-400" onClick={resetFilters}>重置</button>
      </div>

      {/* Tabs */}
      <div className="px-4 py-4">
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
          <TabButton active={activeTab === 'register'} onClick={() => setActiveTab('register')} icon={null}>
            🔥 报名中
          </TabButton>
          <TabButton active={activeTab === 'ongoing'} onClick={() => setActiveTab('ongoing')} icon={null}>
            🕒 进行中
          </TabButton>
          <TabButton active={activeTab === 'completed'} onClick={() => setActiveTab('completed')} icon={null}>
            ✅ 已完赛
          </TabButton>
           <TabButton active={false} onClick={() => {}} icon={null}>
            🌱 青少年赛事
          </TabButton>
        </div>
      </div>

      {/* List */}
      <div className="px-4 pb-4 space-y-4">
        {filteredTournaments.length === 0 ? (
          <div className="text-center py-20 text-gray-400 text-sm">暂无此类赛事</div>
        ) : (
          filteredTournaments.map(tournament => (
            <TournamentListCard 
              key={tournament.id} 
              data={tournament} 
              onClick={() => navigate(`/tournaments/${tournament.id}`)}
            />
          ))
        )}
      </div>
    </div>
  )
}

function TabButton({ active, children, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors",
        active 
          ? "bg-vta-accent text-white shadow-md" 
          : "bg-vta-dark/5 text-gray-600 hover:bg-vta-dark/10"
      )}
    >
      {children}
    </button>
  )
}

function TournamentListCard({ data, onClick }: any) {
  const navigate = useNavigate()
  const percentage = Math.round((data.signed / data.total) * 100)
  const isCompleted = data.status === 'completed'
  
  // Calculate deadline
  const [timeLeft, setTimeLeft] = useState('')
  
  useEffect(() => {
    if (data.status !== 'register' || !data.deadline) return
    
    const calculateTimeLeft = () => {
      const difference = +new Date(data.deadline) - +new Date()
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((difference / 1000 / 60) % 60)
        
        if (days > 0) {
          return `${days}天${hours}小时`
        }
        return `${hours}小时${minutes}分`
      }
      return '已截止'
    }

    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [data.deadline, data.status])

  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      {/* Image Header */}
      <div className="h-32 bg-gray-200 relative">
        <img src={data.image} alt={data.title} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2 flex flex-col items-end space-y-1">
          <span className={cn(
            "text-[10px] font-bold px-2 py-1 rounded text-white backdrop-blur-md",
            isCompleted ? "bg-gray-500/80" : "bg-vta-accent/90"
          )}>
            {data.statusText}
          </span>
          {data.status === 'register' && timeLeft && (
            <span className="text-[10px] font-bold px-2 py-1 rounded text-white backdrop-blur-md bg-black/60 flex items-center">
              <Clock size={10} className="mr-1" /> 
              {timeLeft === '已截止' ? '已截止' : `距截止 ${timeLeft}`}
            </span>
          )}
        </div>
        <div className="absolute bottom-2 left-2">
           <span className="text-[10px] bg-black/60 text-white px-2 py-0.5 rounded backdrop-blur-sm">
             室内硬地
           </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-base font-bold text-slate-800 mb-2">{data.title}</h3>
        
        <div className="grid grid-cols-2 gap-y-2 text-xs text-gray-500 mb-4">
          <div className="flex items-center col-span-2">
            <Calendar size={12} className="mr-1.5 text-gray-400" />
            {data.date}
          </div>
          <div className="flex items-center col-span-2">
            <MapPin size={12} className="mr-1.5 text-gray-400" />
            {data.location}
          </div>
          <div className="flex items-center">
             <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[10px] mr-2">级别</span>
             {data.level}
          </div>
           <div className="flex items-center justify-end font-bold text-slate-900">
             {data.price} <span className="text-gray-400 font-normal ml-1">/人</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
           <div className="flex-1 mr-4">
              <div className="flex justify-between text-[10px] mb-1">
                <span className="text-gray-500">报名进度</span>
                <span className="text-vta-green font-medium">{data.signed}/{data.total}</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-vta-green" style={{ width: `${percentage}%` }}></div>
              </div>
           </div>
           
           <button 
             className={cn(
               "px-4 py-1.5 rounded-full text-xs font-bold transition-transform active:scale-95",
               isCompleted 
                ? "bg-gray-100 text-slate-600 border border-gray-200"
                : "bg-vta-green text-white shadow-lg shadow-vta-green/30"
             )}
             onClick={(e) => {
               e.stopPropagation()
               if (isCompleted) {
                 navigate(`/match-report/${data.id}`)
               } else {
                 navigate(`/payment/${data.id}`)
               }
             }}
           >
             {isCompleted ? '查看战报' : '立即报名'}
           </button>
        </div>
      </div>
    </div>
  )
}
