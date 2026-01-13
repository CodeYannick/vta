import { ArrowLeft, Globe, Mail, Phone } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function IntroductionPage() {
  const navigate = useNavigate()

  return (
    <div className="bg-white min-h-full">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center border-b border-gray-100 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft size={20} className="text-slate-800" />
        </button>
        <h1 className="text-base font-bold text-slate-800">关于 VTA</h1>
      </div>

      <div className="p-0">
        {/* Hero Image */}
        <div className="h-48 bg-vta-green relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-vta-green to-black/80"></div>
            <div className="absolute inset-0 flex items-center justify-center flex-col text-white p-6 text-center">
                <h2 className="text-3xl font-bold italic tracking-tighter mb-2">VTA TOUR</h2>
                <p className="text-sm opacity-80">致力于打造最专业的业余网球赛事体系</p>
            </div>
        </div>

        <div className="p-6 space-y-8 text-gray-600 leading-relaxed text-sm">
            <section>
                <h3 className="text-lg font-bold text-slate-800 mb-3 border-l-4 border-vta-green pl-3">赛事简介</h3>
                <p>
                    VTA (Virtual Tennis Association) 成立于2024年，是面向广大网球爱好者的专业积分赛事平台。我们引入职业巡回赛的积分体系和排名机制，让每一位业余选手都能体验职业球员的晋级之路。
                </p>
            </section>

            <section>
                <h3 className="text-lg font-bold text-slate-800 mb-3 border-l-4 border-vta-green pl-3">赛制体系</h3>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong className="text-slate-700">大师赛 (Masters)</strong>：最高级别赛事，积分权重 1000</li>
                    <li><strong className="text-slate-700">挑战赛 (Challenger)</strong>：进阶赛事，积分权重 500</li>
                    <li><strong className="text-slate-700">未来赛 (Futures)</strong>：入门赛事，积分权重 250</li>
                    <li><strong className="text-slate-700">年终总决赛 (Finals)</strong>：年度积分前8名受邀参加</li>
                </ul>
            </section>

            <section>
                <h3 className="text-lg font-bold text-slate-800 mb-3 border-l-4 border-vta-green pl-3">联系我们</h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                    <div className="flex items-center">
                        <Phone size={16} className="text-vta-green mr-3" />
                        <span>028-8888 8888</span>
                    </div>
                    <div className="flex items-center">
                        <Mail size={16} className="text-vta-green mr-3" />
                        <span>contact@vta.com</span>
                    </div>
                    <div className="flex items-center">
                        <Globe size={16} className="text-vta-green mr-3" />
                        <span>www.vta-tour.com</span>
                    </div>
                </div>
            </section>
        </div>
        
        <div className="p-6 text-center text-xs text-gray-300 pb-10">
            Copyright © 2026 VTA Tour. All rights reserved.
        </div>
      </div>
    </div>
  )
}
