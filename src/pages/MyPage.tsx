import { Settings, CreditCard, Users, FileText, ChevronRight, LogOut, ShieldCheck, Trophy } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'

export default function MyPage() {
  const navigate = useNavigate()
  
  const user = {
    name: "微信用户",
    id: "VTA-8848",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=250&auto=format&fit=crop",
    days: 2
  }

  return (
    <div className="bg-gray-50 min-h-full pb-20">
      {/* Identity Card Header */}
      <div className="bg-vta-dark text-white p-6 pt-10 pb-16 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-vta-green rounded-full opacity-20 -mr-16 -mt-16 blur-3xl"></div>
        
        <div className="flex items-center space-x-4 relative z-10">
          <div className="w-16 h-16 rounded-full border-2 border-white/20 overflow-hidden bg-gray-700">
            <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
             <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold">{user.name}</h1>
                <Link to="/my/profile" className="text-xs text-gray-400 flex items-center hover:text-white transition-colors">
                   个人资料 <ChevronRight size={12} />
                </Link>
             </div>
             <div className="text-xs text-gray-400 mt-1">ID: {user.id}</div>
             <div className="mt-2 flex space-x-2">
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded border border-white/10 flex items-center">
                   <span className="mr-1">♂</span> 男
                </span>
                <span className="text-[10px] bg-vta-gold text-black px-2 py-0.5 rounded font-bold">
                   💎 钻石 II
                </span>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded border border-white/10">
                   VTA NO.1
                </span>
             </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="-mt-8 px-4 relative z-20 space-y-4 pb-10">
        
        {/* Core Services Grid */}
        <div className="bg-white rounded-xl shadow-sm p-4">
           <h2 className="text-sm font-bold text-slate-800 mb-4 ml-1">赛事服务</h2>
           <div className="grid grid-cols-4 gap-4">
              <MenuIcon label="我的赛事" icon={Trophy} onClick={() => navigate('/tournaments')} />
              <MenuIcon label="我的报名" icon={FileText} onClick={() => navigate('/my/registrations')} />
              <MenuIcon label="常用报名人" icon={Users} highlight onClick={() => navigate('/my/players')} />
              <MenuIcon label="我的订单" icon={CreditCard} onClick={() => alert('查看订单列表')} />
              <MenuIcon label="我的保险" icon={ShieldCheck} onClick={() => alert('查看保险单')} />
           </div>
        </div>

        {/* Help & Settings */}
        <div className="bg-white rounded-xl shadow-sm p-4">
           <h2 className="text-sm font-bold text-slate-800 mb-4 ml-1">其他</h2>
           <div className="grid grid-cols-4 gap-4">
              <MenuIcon label="客服" icon={CustomerServiceIcon} onClick={() => alert('联系客服')} />
              <MenuIcon label="系统设置" icon={Settings} onClick={() => alert('进入设置')} />
              <MenuIcon label="退出登录" icon={LogOut} color="text-red-500" onClick={() => alert('退出登录')} />
           </div>
        </div>

        {/* Footer Message */}
        <div className="text-center py-6">
           <p className="text-xs text-vta-green font-medium">Hello! 今天是你征战VTA的第 {user.days} 天</p>
           <p className="text-[10px] text-gray-300 mt-2">Version 1.0.0 (MVP)</p>
        </div>

      </div>
    </div>
  )
}

function MenuIcon({ label, icon: Icon, color, highlight, onClick }: any) {
   return (
     <button 
       onClick={onClick}
       className="flex flex-col items-center space-y-2 active:opacity-60 transition-opacity relative group w-full"
     >
       {highlight && (
         <div className="absolute top-0 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
       )}
       <div className={cn(
         "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
         "bg-gray-50 group-hover:bg-gray-100"
       )}>
          <Icon size={20} className={color || "text-slate-700"} />
       </div>
       <span className="text-[11px] text-gray-600">{label}</span>
     </button>
   )
}

// Custom Icons
const CustomerServiceIcon = ({size, className}: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 13a6 6 0 1 0-12 0 6 6 0 0 0 12 0Z"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M20 12h2"/><path d="M2 12h2"/><path d="M15 15a3 3 0 1 0-4.24-4.24"/></svg>
)
