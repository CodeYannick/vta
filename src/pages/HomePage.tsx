import { Search, MapPin, ChevronRight, Calendar, Users, Trophy, BarChart2, FileText, Activity } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

export default function HomePage() {
  const navigate = useNavigate()
  
  return (
    <div className="bg-gray-50 min-h-full">
      {/* Header */}
      <header className="bg-vta-dark text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">成都市</span>
          <ChevronRight size={14} className="text-gray-400" />
        </div>
        <div className="flex-1 mx-4 bg-white/10 rounded-full flex items-center px-3 py-1.5">
          <Search size={14} className="text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="搜索赛事、场地..." 
            className="bg-transparent border-none outline-none text-xs text-white w-full placeholder-gray-400"
          />
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-700 border border-gray-600 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=250&auto=format&fit=crop" alt="Avatar" className="w-full h-full object-cover" />
        </div>
      </header>

      {/* Banner */}
      <div className="relative h-48 bg-vta-green overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-vta-green to-vta-dark opacity-90"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h1 className="text-3xl font-bold italic tracking-tighter mb-2">RACE TO THE VTA FINALS</h1>
            <p className="text-xs bg-white/20 inline-block px-3 py-1 rounded-full backdrop-blur-sm">
              2026 冬季大师赛 · 报名开启
            </p>
          </div>
        </div>
        {/* Decorative elements simulating the poster style */}
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-vta-gold rounded-full opacity-20 blur-xl"></div>
        <div className="absolute -left-10 -top-10 w-40 h-40 bg-vta-accent rounded-full opacity-20 blur-xl"></div>
      </div>

      {/* Main Actions Grid */}
      <div className="px-4 -mt-6 relative z-10 grid grid-cols-2 gap-4">
        {/* Tournament Card */}
        <Link to="/tournaments" className="bg-vta-green rounded-xl p-4 text-white shadow-lg flex flex-col justify-between h-24 relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-lg font-bold">比赛</h3>
            <p className="text-[10px] opacity-80 mt-1">积极参赛 提升排名</p>
          </div>
          <Trophy className="absolute right-2 bottom-2 text-white/10 group-hover:scale-110 transition-transform" size={48} />
        </Link>

        {/* Training Card (Grayed Out) */}
        <div 
          className="bg-gray-700 rounded-xl p-4 text-white shadow-lg flex flex-col justify-between h-24 relative overflow-hidden cursor-not-allowed opacity-90"
          onClick={() => alert('VTA学院正在筹备中，敬请期待！')}
        >
          <div className="relative z-10">
            <h3 className="text-lg font-bold text-gray-300">训练</h3>
            <p className="text-[10px] text-gray-400 mt-1">VTA学院 筹备中</p>
          </div>
          <div className="absolute right-2 bottom-2 text-white/5">
             <div className="w-12 h-12 border-4 border-white/10 rounded-full"></div>
          </div>
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
             <span className="text-[10px] font-bold bg-black/50 px-2 py-1 rounded text-gray-300">敬请期待</span>
          </div>
        </div>
      </div>

      {/* Quick Menu */}
      <div className="grid grid-cols-4 gap-4 px-4 py-6">
        {[
          { name: '积分排行', icon: BarChart2, path: '/rankings' },
          { name: '我的赛事', icon: Calendar, path: '/my/registrations' },
          { name: 'VTA介绍', icon: FileText, path: '/intro' },
          { name: '生涯数据', icon: Activity, path: '/career' },
        ].map((item, i) => (
          <Link to={item.path} key={i} className="flex flex-col items-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-vta-green">
              <item.icon size={20} />
            </div>
            <span className="text-xs text-gray-600">{item.name}</span>
          </Link>
        ))}
      </div>

      {/* Hot Tournaments */}
      <div className="bg-white rounded-t-3xl min-h-[300px] p-4 pb-20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-800">热门赛事</h2>
          <Link to="/tournaments" className="text-xs text-gray-400 flex items-center">
            全部 <ChevronRight size={12} />
          </Link>
        </div>

        <div className="space-y-4">
          <TournamentCard 
            id={1}
            title="2026年冬季网球大师赛"
            date="2026-01-20 19:00"
            location="北京市海淀区中关村网球馆"
            status="报名中"
            level="大师赛"
            signed={24}
            total={32}
            image="https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=2070&auto=format&fit=crop"
            onClick={() => navigate('/tournaments/1')}
          />
           <TournamentCard 
            id={2}
            title="VTA 周末挑战赛 (第45期)"
            date="2026-01-24 14:00"
            location="国家网球中心"
            status="报名中"
            level="钻石赛"
            signed={8}
            total={16}
            image="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=2070&auto=format&fit=crop"
            onClick={() => navigate('/tournaments/2')}
          />
        </div>
      </div>
    </div>
  )
}

function TournamentCard({ title, date, location, status, level, signed, total, image, onClick }: any) {
  const percentage = Math.round((signed / total) * 100)
  
  return (
    <div 
      onClick={onClick}
      className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden flex cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="w-24 h-24 bg-gray-200 shrink-0">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-800 line-clamp-1">{title}</h3>
          <div className="flex items-center mt-1 space-x-2">
            <span className="text-[10px] bg-vta-green/10 text-vta-green px-1.5 py-0.5 rounded">{level}</span>
            <span className="text-[10px] text-vta-accent border border-vta-accent/30 px-1.5 py-0.5 rounded">{status}</span>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center text-[10px] text-gray-500">
            <Calendar size={10} className="mr-1" /> {date}
          </div>
          <div className="flex items-center justify-between">
             <div className="flex items-center text-[10px] text-gray-500">
                <MapPin size={10} className="mr-1" /> <span className="truncate max-w-[100px]">{location}</span>
             </div>
             <div className="flex items-center text-[10px] font-medium text-vta-accent">
                <Users size={10} className="mr-1" /> {signed}/{total}
             </div>
          </div>
          {/* Progress Bar */}
          <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden mt-1">
            <div className="h-full bg-vta-accent" style={{ width: `${percentage}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
