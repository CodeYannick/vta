import { ArrowLeft, Calendar, MapPin, ChevronRight, Download } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'

export default function MyRegistrationsPage() {
  const navigate = useNavigate()

  const registrations = [
    {
      id: 1,
      title: "2026年冬季网球大师赛",
      date: "2026-01-20 19:00",
      location: "北京市海淀区中关村网球馆",
      status: "success",
      statusText: "报名成功",
      price: "¥120",
      image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "VTA 新星杯单打赛",
      date: "2026-01-15 10:00",
      location: "朝阳公园网球中心",
      status: "completed",
      statusText: "已完赛",
      price: "¥80",
      image: "https://images.unsplash.com/photo-1519163219899-21d2bb723b3e?q=80&w=2070&auto=format&fit=crop"
    }
  ]

  return (
    <div className="bg-gray-50 min-h-full">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center border-b border-gray-100 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft size={20} className="text-slate-800" />
        </button>
        <h1 className="text-base font-bold text-slate-800">我的报名</h1>
      </div>

      <div className="p-4 space-y-4">
        {registrations.map(item => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex justify-between items-start mb-3 border-b border-gray-50 pb-3">
               <div>
                  <h3 className="font-bold text-slate-800 text-sm mb-1">{item.title}</h3>
                  <span className={cn(
                    "text-[10px] px-2 py-0.5 rounded",
                    item.status === 'success' ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
                  )}>
                    {item.statusText}
                  </span>
               </div>
               <div className="text-sm font-bold text-slate-800">{item.price}</div>
            </div>

            <div className="flex space-x-3">
               <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
               </div>
               <div className="flex-1 space-y-1">
                  <div className="flex items-center text-xs text-gray-500">
                     <Calendar size={12} className="mr-1.5" />
                     {item.date}
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                     <MapPin size={12} className="mr-1.5" />
                     {item.location}
                  </div>
                  <div className="flex justify-end mt-2 pt-2">
                     {item.status === 'success' && (
                       <button className="text-xs border border-gray-200 px-3 py-1 rounded-full text-gray-600 flex items-center hover:bg-gray-50">
                         <Download size={12} className="mr-1" /> 电子票
                       </button>
                     )}
                     <button 
                       className="text-xs bg-vta-green text-white px-3 py-1 rounded-full ml-2 flex items-center"
                       onClick={() => navigate(`/tournaments/${item.id}`)}
                     >
                       详情 <ChevronRight size={12} />
                     </button>
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
