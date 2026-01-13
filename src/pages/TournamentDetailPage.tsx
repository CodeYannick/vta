import { ArrowLeft, Calendar, MapPin, Users, Trophy, ShieldCheck, Share2 } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

export default function TournamentDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams()

  // Mock data - in a real app this would come from an API based on the ID
  const tournament = {
    id: id || 1,
    title: "2026年冬季网球大师赛",
    date: "2026-01-20",
    time: "19:00 - 22:00",
    location: "北京市海淀区中关村网球馆",
    status: "register",
    statusText: "报名中",
    level: "钻石",
    signed: 24,
    total: 32,
    price: 120,
    organizer: "VTA 官方赛事组委会",
    image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=2070&auto=format&fit=crop",
    description: "本年度最后一场大师赛，前四名可直接晋级年终总决赛。比赛采用小组循环+淘汰赛制，保证每位选手至少进行3场比赛。",
    rules: [
        "比赛采用信任制，无裁判",
        "小组赛采用4局无占先，4-4抢七",
        "淘汰赛采用6局无占先，6-6抢七",
        "迟到15分钟判负"
    ]
  }

  const handleRegister = () => {
    navigate(`/payment/${tournament.id}`)
  }

  return (
    <div className="bg-gray-50 min-h-full pb-20">
      {/* Header Image */}
      <div className="relative h-64 bg-gray-900">
        <img src={tournament.image} alt={tournament.title} className="w-full h-full object-cover opacity-80" />
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
            <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white">
                <ArrowLeft size={18} />
            </button>
            <button className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white">
                <Share2 size={18} />
            </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
            <div className="flex items-center space-x-2 mb-2">
                <span className="bg-vta-green text-xs font-bold px-2 py-0.5 rounded">{tournament.level}</span>
                <span className="bg-vta-accent text-xs font-bold px-2 py-0.5 rounded text-black">单打</span>
            </div>
            <h1 className="text-xl font-bold leading-tight">{tournament.title}</h1>
        </div>
      </div>

      <div className="p-4 -mt-4 relative z-10 space-y-4">
        {/* Info Card */}
        <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
            <InfoRow icon={Calendar} text={`${tournament.date} (${tournament.time})`} />
            <InfoRow icon={MapPin} text={tournament.location} />
            <InfoRow icon={Users} text={`已报名 ${tournament.signed}/${tournament.total} 人`} />
            <InfoRow icon={Trophy} text={`主办方：${tournament.organizer}`} />
        </div>

        {/* Players Preview */}
        <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-gray-800">已报名选手</h3>
                <span className="text-xs text-gray-500">查看全部 {tournament.signed} 人</span>
            </div>
            <div className="flex -space-x-2 overflow-hidden py-1">
                {[
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=100&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop"
                ].map((src, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                        <img src={src} alt="avatar" className="w-full h-full object-cover" />
                    </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                    +{tournament.signed - 8}
                </div>
            </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="font-bold text-gray-800 mb-2">赛事介绍</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{tournament.description}</p>
        </div>

        {/* Rules */}
        <div className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="font-bold text-gray-800 mb-2">竞赛规则</h3>
            <ul className="space-y-2">
                {tournament.rules.map((rule, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-vta-green mt-1.5 mr-2 shrink-0"></div>
                        {rule}
                    </li>
                ))}
            </ul>
        </div>
        
        {/* Insurance Note */}
        <div className="flex items-center justify-center text-xs text-gray-400 py-2">
            <ShieldCheck size={12} className="mr-1" />
            <span>本赛事包含运动意外险</span>
        </div>
      </div>

      {/* Footer Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 px-6 flex items-center justify-between z-50 safe-area-bottom">
        <div>
            <div className="text-xs text-gray-500">报名费</div>
            <div className="text-xl font-bold text-red-500">¥{tournament.price}</div>
        </div>
        <button 
            onClick={handleRegister}
            className="bg-vta-green text-white px-8 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-vta-green/30 active:scale-95 transition-transform"
        >
            立即报名
        </button>
      </div>
    </div>
  )
}

function InfoRow({ icon: Icon, text }: any) {
    return (
        <div className="flex items-center text-sm text-gray-600">
            <div className="w-8 flex justify-center">
                <Icon size={16} className="text-vta-green" />
            </div>
            <span className="flex-1">{text}</span>
        </div>
    )
}
