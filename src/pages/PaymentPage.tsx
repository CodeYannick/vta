import { useState } from 'react'
import { ArrowLeft, CheckCircle, Clock, ShieldCheck, ChevronRight, X } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { cn } from '@/lib/utils'

export default function PaymentPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [step, setStep] = useState<'confirm' | 'processing' | 'success'>('confirm')
  const [showInsurance, setShowInsurance] = useState(false)

  // Mock Data
  const tournament = {
    id: id,
    title: "2026年冬季网球大师赛",
    date: "2026-01-20 19:00",
    location: "北京市海淀区中关村网球馆",
    price: 120,
    insuranceFee: 0, // Free for MVP
  }

  const handlePay = () => {
    setStep('processing')
    // Simulate API call
    setTimeout(() => {
      setStep('success')
    }, 1500)
  }

  if (step === 'success') {
    return (
      <div className="bg-white min-h-full flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">报名成功</h1>
        <p className="text-gray-500 text-sm mb-8">
          您已成功报名参加 {tournament.title}，请准时参赛。
        </p>
        <div className="w-full space-y-3">
          <button 
            onClick={() => navigate('/my')}
            className="w-full bg-vta-green text-white py-3 rounded-full font-bold"
          >
            查看我的报名
          </button>
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-gray-100 text-gray-600 py-3 rounded-full font-bold"
          >
            返回首页
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-full flex flex-col relative">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center border-b border-gray-100 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft size={20} className="text-slate-800" />
        </button>
        <h1 className="text-base font-bold text-slate-800">确认订单</h1>
      </div>

      <div className="flex-1 p-4 space-y-4">
        {/* Count Down */}
        <div className="bg-orange-50 text-orange-600 text-xs px-4 py-2 rounded-lg flex items-center justify-center">
          <Clock size={12} className="mr-1" />
          请在 14:59 内完成支付，超时订单将自动取消
        </div>

        {/* Item Info */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
           <h2 className="font-bold text-slate-800 mb-2">{tournament.title}</h2>
           <div className="text-xs text-gray-500 space-y-1">
             <p>时间：{tournament.date}</p>
             <p>地点：{tournament.location}</p>
             <p>项目：单打 / NTRP 3.0</p>
           </div>
        </div>

        {/* Player Info */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
           <div className="flex justify-between items-center mb-3">
             <h3 className="font-bold text-slate-800 text-sm">参赛信息</h3>
             <button className="text-xs text-vta-green">修改</button>
           </div>
           <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div>
                <div className="font-bold text-slate-800 text-sm mb-0.5">李林峰</div>
                <div className="text-xs text-gray-500 space-y-0.5">
                    <p>138****8888</p>
                    <p className="text-gray-400">510107********1234</p>
                </div>
              </div>
              <div className="text-xs text-gray-400">默认报名人</div>
           </div>
        </div>

        {/* Insurance */}
        <div 
            className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between cursor-pointer active:bg-gray-50 transition-colors"
            onClick={() => setShowInsurance(true)}
        >
           <div className="flex items-center">
             <ShieldCheck size={18} className="text-vta-green mr-2" />
             <div>
               <div className="text-sm font-bold text-slate-800">运动意外险</div>
               <div className="text-[10px] text-gray-400">最高保额 10W</div>
             </div>
           </div>
           <div className="flex items-center text-sm font-bold text-slate-800">
             免费赠送 <ChevronRight size={14} className="text-gray-300 ml-1" />
           </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="bg-white border-t border-gray-100 p-4 pb-10">
        <div className="flex justify-between items-center mb-4 text-sm">
          <span className="text-gray-600">报名费</span>
          <span className="font-bold">¥{tournament.price}</span>
        </div>
        <button 
          onClick={handlePay}
          disabled={step === 'processing'}
          className={cn(
            "w-full py-3 rounded-full font-bold text-white shadow-lg flex items-center justify-center",
            step === 'processing' ? "bg-gray-400 cursor-not-allowed" : "bg-vta-green shadow-vta-green/30 active:scale-95 transition-transform"
          )}
        >
          {step === 'processing' ? '正在支付...' : `立即支付 ¥${tournament.price}`}
        </button>
      </div>

      {/* Insurance Modal */}
      {showInsurance && (
        <div className="absolute inset-0 z-50">
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

                    <div className="text-[10px] text-gray-400 leading-relaxed">
                        <p className="mb-2">特别说明：</p>
                        <p>1. 本保险仅承保被保险人参加 VTA 组织的网球赛事期间发生的意外事故。</p>
                        <p>2. 被保险人年龄需在 3-70 周岁之间。</p>
                        <p>3. 既往症及慢性病不属于承保范围。</p>
                    </div>
                </div>

                <button 
                    onClick={() => setShowInsurance(false)}
                    className="w-full bg-slate-800 text-white py-3 rounded-full font-bold mt-4"
                >
                    我知道了
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
