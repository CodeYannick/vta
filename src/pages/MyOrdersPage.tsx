import { ArrowLeft, ShieldCheck, X, Copy } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function MyOrdersPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'all' | 'unpaid' | 'completed'>('all')
  const [showInsurance, setShowInsurance] = useState(false)

  const orders = [
    {
      id: "ORDER-20260115-001",
      title: "2026年冬季网球大师赛",
      item: "单打 / 大师赛",
      price: "200.00",
      status: "completed",
      statusText: "已完成",
      date: "2026-01-15 14:30:25",
      hasInsurance: true
    },
    {
      id: "ORDER-20260110-003",
      title: "VTA 新星杯单打赛",
      item: "单打 / 青铜赛",
      price: "80.00",
      status: "completed",
      statusText: "已完成",
      date: "2026-01-10 09:15:00",
      hasInsurance: true
    },
    {
      id: "ORDER-20251228-005",
      title: "VTA 周末挑战赛",
      item: "单打 / 钻石赛",
      price: "100.00",
      status: "cancelled",
      statusText: "已取消",
      date: "2025-12-28 10:00:00",
      hasInsurance: false
    }
  ]

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true
    if (activeTab === 'unpaid') return order.status === 'unpaid'
    if (activeTab === 'completed') return order.status === 'completed'
    return true
  })

  return (
    <div className="bg-gray-50 min-h-full flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center border-b border-gray-100 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft size={20} className="text-slate-800" />
        </button>
        <h1 className="text-base font-bold text-slate-800">我的订单</h1>
      </div>

      {/* Tabs */}
      <div className="bg-white px-4">
        <div className="flex space-x-6">
            {['all', 'unpaid', 'completed'].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={cn(
                        "py-3 text-sm font-medium border-b-2 transition-colors",
                        activeTab === tab 
                            ? "text-vta-green border-vta-green" 
                            : "text-gray-500 border-transparent"
                    )}
                >
                    {tab === 'all' ? '全部' : tab === 'unpaid' ? '待支付' : '已完成'}
                </button>
            ))}
        </div>
      </div>

      {/* List */}
      <div className="p-4 space-y-4 flex-1">
        {filteredOrders.length === 0 ? (
            <div className="text-center py-20 text-gray-400 text-xs">暂无订单数据</div>
        ) : (
            filteredOrders.map(order => (
                <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex justify-between items-center border-b border-gray-50 pb-3 mb-3">
                        <span className="text-xs text-gray-500">订单号：{order.id}</span>
                        <span className={cn(
                            "text-xs font-bold",
                            order.status === 'completed' ? "text-slate-800" : 
                            order.status === 'unpaid' ? "text-orange-500" : "text-gray-400"
                        )}>
                            {order.statusText}
                        </span>
                    </div>
                    
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="font-bold text-slate-800 mb-1">{order.title}</h3>
                            <p className="text-xs text-gray-500">{order.item}</p>
                        </div>
                        <div className="text-right">
                            <div className="font-bold text-lg">¥{order.price}</div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <div className="text-[10px] text-gray-400">{order.date}</div>
                        <div className="flex space-x-2">
                            {order.hasInsurance && (
                                <button 
                                    onClick={() => setShowInsurance(true)}
                                    className="flex items-center text-xs text-vta-green bg-vta-green/5 px-2 py-1 rounded border border-vta-green/20"
                                >
                                    <ShieldCheck size={12} className="mr-1" /> 查看保险
                                </button>
                            )}
                            <button className="text-xs border border-gray-200 px-3 py-1 rounded text-slate-600">
                                开发票
                            </button>
                        </div>
                    </div>
                </div>
            ))
        )}
      </div>

      {/* Insurance Modal (Reused) */}
      {showInsurance && (
        <div className="absolute inset-0 z-50 fixed">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowInsurance(false)}></div>
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 animate-in slide-in-from-bottom duration-300">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-slate-800">保险详情</h3>
                    <button onClick={() => setShowInsurance(false)} className="p-1 bg-gray-100 rounded-full">
                        <X size={16} className="text-gray-500" />
                    </button>
                </div>
                
                <div className="space-y-6 max-h-[60vh] overflow-y-auto pb-10">
                    <div className="bg-vta-green/5 p-4 rounded-xl border border-vta-green/10">
                        <div className="flex items-center mb-2">
                            <ShieldCheck size={20} className="text-vta-green mr-2" />
                            <span className="font-bold text-vta-green">VTA 赛事专属运动意外险</span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">
                            本保险由 VTA 官方合作保险公司提供，覆盖比赛期间发生的意外伤害。
                        </p>
                    </div>

                    <div className="space-y-4">
                        <InsuranceItem title="意外身故/残疾" amount="100,000" />
                        <InsuranceItem title="意外医疗费用" amount="10,000" />
                        <InsuranceItem title="突发急性病身故" amount="50,000" />
                        <InsuranceItem title="救护车费用" amount="500" />
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg text-xs space-y-2">
                        <div className="flex justify-between">
                            <span className="text-gray-500">被保险人</span>
                            <span className="font-medium text-slate-800">李林峰</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">身份证号</span>
                            <span className="font-medium text-slate-800">510107********1234</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">保单状态</span>
                            <span className="font-bold text-vta-green">保障中</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">保单号</span>
                            <div className="flex items-center">
                                <span className="font-medium text-slate-800 mr-1">PICY-202601158848</span>
                                <Copy size={10} className="text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>

                <button 
                    onClick={() => setShowInsurance(false)}
                    className="w-full bg-slate-800 text-white py-3 rounded-full font-bold mt-4"
                >
                    关闭
                </button>
            </div>
        </div>
      )}
    </div>
  )
}

function InsuranceItem({ title, amount }: any) {
    return (
        <div className="flex justify-between items-center border-b border-gray-50 pb-2">
            <span className="text-sm text-gray-600">{title}</span>
            <span className="text-sm font-bold text-slate-800">¥{amount}</span>
        </div>
    )
}
