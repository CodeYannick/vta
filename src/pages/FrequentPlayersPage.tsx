import { ArrowLeft, Plus, Trash2, Edit2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function FrequentPlayersPage() {
  const navigate = useNavigate()

  const players = [
    {
      id: 1,
      name: "李林峰",
      phone: "138****8888",
      idCard: "510107********1234",
      relation: "本人",
      isDefault: true
    },
    {
      id: 2,
      name: "张小雨",
      phone: "139****9999",
      idCard: "510107********5678",
      relation: "朋友",
      isDefault: false
    }
  ]

  return (
    <div className="bg-gray-50 min-h-full flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="mr-2">
            <ArrowLeft size={20} className="text-slate-800" />
          </button>
          <h1 className="text-base font-bold text-slate-800">常用报名人</h1>
        </div>
        <button className="text-vta-green">
           <Plus size={20} />
        </button>
      </div>

      <div className="p-4 space-y-3 flex-1">
        {players.map(player => (
          <div key={player.id} className="bg-white rounded-xl shadow-sm p-4 relative overflow-hidden">
            {player.isDefault && (
              <div className="absolute top-0 right-0 bg-vta-gold text-[10px] px-2 py-1 rounded-bl-lg font-bold">默认</div>
            )}
            
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-baseline space-x-2">
                   <h3 className="font-bold text-slate-800 text-lg">{player.name}</h3>
                   <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">{player.relation}</span>
                </div>
                <div className="text-sm text-gray-500 mt-1 space-y-0.5">
                   <p>手机：{player.phone}</p>
                   <p>证件：{player.idCard}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-4 pt-3 border-t border-gray-50">
               <button className="flex items-center text-xs text-gray-400 hover:text-slate-600">
                  <Edit2 size={12} className="mr-1" /> 编辑
               </button>
               {!player.isDefault && (
                 <button className="flex items-center text-xs text-gray-400 hover:text-red-500">
                    <Trash2 size={12} className="mr-1" /> 删除
                 </button>
               )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-6 text-center text-xs text-gray-400">
         最多可添加 5 位常用报名人
      </div>
    </div>
  )
}
