import { ArrowLeft, Share2, Phone, Navigation, CheckCircle2, Circle, X, Users, ChevronDown, ChevronUp, Info } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function TournamentDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [agreed, setAgree] = useState(false)
  const [showEligibilityModal, setShowEligibilityModal] = useState(false)
  const [showRulesModal, setShowRulesModal] = useState(false)
  const [showDetailedRulesModal, setShowDetailedRulesModal] = useState(false)
  const [activeTab, setActiveTab] = useState('info')
  const [drawTab, setDrawTab] = useState<'upcoming' | 'finished'>('upcoming')
  const [showFullDescription, setShowFullDescription] = useState(false)

  // Mock Data
  const mockPlayers = Array.from({ length: 32 }).map((_, i) => ({
    id: i + 1,
    name: ["张伟", "李强", "王勇", "刘洋", "陈杰", "赵强", "孙林", "周敏", "吴刚", "郑涛", "陈静", "杨光", "徐雷", "朱峰", "高山", "林海", "马云", "马化腾", "李彦宏", "雷军", "刘强东", "丁磊", "张一鸣", "黄峥", "王兴", "程维", "许家印", "王健林", "杨国强", "李嘉诚", "李兆基", "郑裕彤"][i] || `选手${i+1}`,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
    ranking: Math.floor(Math.random() * 50) + 1,
    points: Math.floor(Math.random() * 2000) + 500,
    status: i < 28 ? '已报名' : '候补'
  }))

  const mockDraw = [
    { 
        round: "第一轮", 
        matches: Array.from({ length: 8 }).map((_, i) => ({
            id: i,
            p1: mockPlayers[i*2].name,
            p2: mockPlayers[i*2+1].name,
            score: i < 4 ? ["6:4", "6:2", "7:5", "6:3"][i] : "VS",
            status: i < 4 ? "finished" : "upcoming"
        }))
    },
    { 
        round: "第二轮", 
        matches: Array.from({ length: 4 }).map((_, i) => ({
            id: i + 10,
            p1: i < 2 ? mockPlayers[i].name : "TBD",
            p2: i < 2 ? mockPlayers[i+2].name : "TBD",
            score: "VS",
            status: "upcoming"
        }))
    }
  ]

  const mockSchedule = [
    { time: "09:00", court: "1号场", match: "张伟 VS 李强", round: "第一轮", status: "finished" },
    { time: "09:00", court: "2号场", match: "王勇 VS 刘洋", round: "第一轮", status: "finished" },
    { time: "10:00", court: "1号场", match: "陈杰 VS 赵强", round: "第一轮", status: "upcoming" },
    { time: "10:00", court: "2号场", match: "孙林 VS 周敏", round: "第一轮", status: "upcoming" },
    { time: "11:00", court: "Center", match: "吴刚 VS 郑涛", round: "第一轮", status: "upcoming" },
  ]

  // Mock data matching the screenshot
  const tournament = {
    id: id || 1,
    title: "2026年冬季网球大师赛",
    level: "VTA挑战赛",
    startTime: "2026/01/20 周二 19:00",
    regPeriod: "2026/01/01 00:00 – 2026/01/18 12:00",
    location: "北京市海淀区中关村网球馆",
    phone: "010-22334455",
    price: 200,
    quota: "1/16签",
    image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=2070&auto=format&fit=crop",
    description: "本年度最后一场大师赛，前四名可直接晋级年终总决赛。比赛采用小组循环+淘汰赛制，保证每位选手至少进行3场比赛。平日里默默训练的业余好手们，终于可以卸下日常的身份，在聚光灯下为自己的梦想奋力一搏。这将是一场关于热爱与坚持的盛会，每一个回合都值得被记录。",
    qualifications: [
        "纯业余选手(年龄18~60岁);",
        "本站谢绝专业或职业选手(含注册过，含已退役);",
        "持证网球专业国家一二三级运动员;",
        "高校高水平网球运动员、网球教练员(含兼职);",
        "以及VTA积分排名前十球员。"
    ],
    awards: [
        "冠军:赛事专属奖杯一座;",
        "亚军:赛事专属奖盘一座;",
        "四强:赛事专属奖牌一座;"
    ],
    refundPolicy: "开赛前24小时外可免费退赛，24小时以内不可退赛"
  }

  const handleRegisterClick = () => {
    if (!agreed) {
        alert("请先阅读并同意《报名须知》")
        return
    }
    setShowEligibilityModal(true)
  }

  const handleConfirmRegistration = () => {
    setShowEligibilityModal(false)
    navigate(`/payment/${tournament.id}`)
  }

  return (
    <div className="bg-gray-100 min-h-full pb-24">
      {/* Header Image Area */}
      <div className="relative h-56 bg-gray-900">
        <img src={tournament.image} alt={tournament.title} className="w-full h-full object-cover opacity-80" />
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent z-10">
            <button onClick={() => navigate(-1)} className="text-white hover:bg-white/20 p-1 rounded-full transition-colors">
                <ArrowLeft size={24} />
            </button>
            <h1 className="text-white text-lg font-bold flex-1 text-center mx-4">赛事详情</h1>
            <div className="flex space-x-2">
                <button className="text-white hover:bg-white/20 p-1 rounded-full transition-colors">
                    <Share2 size={24} />
                </button>
            </div>
        </div>
        
        {/* Title Overlay */}
        <div className="absolute bottom-12 left-4 right-4 text-white">
            <h2 className="text-2xl font-bold mb-1">{tournament.title}</h2>
            <div className="flex items-center">
                <span className="text-orange-400 font-bold italic text-lg mr-2">VTA 星光赛</span>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded backdrop-blur-md uppercase tracking-wider">Starry Tournament</span>
            </div>
        </div>

        {/* Tabs Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md flex text-white text-sm">
            {['赛事信息', '选手名单', '签表', '赛程'].map((tab) => (
                <button 
                    key={tab}
                    onClick={() => setActiveTab(tab === '赛事信息' ? 'info' : tab)}
                    className={cn(
                        "flex-1 py-3 text-xs font-medium transition-colors relative",
                        (activeTab === 'info' && tab === '赛事信息') || activeTab === tab ? "text-vta-gold" : "text-white/80 hover:text-white"
                    )}
                >
                    {tab}
                    {((activeTab === 'info' && tab === '赛事信息') || activeTab === tab) && (
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-vta-gold rounded-t-full"></div>
                    )}
                </button>
            ))}
        </div>
      </div>

      <div className="p-3 space-y-3">
        {/* Tab Content: Event Info */}
        {activeTab === 'info' && (
            <div className="space-y-3 animate-in fade-in duration-300">
                {/* Basic Info Card */}
                <div className="bg-white rounded-xl p-4 shadow-sm space-y-4 text-sm">
                    <div className="flex justify-between items-center py-1 border-b border-gray-50 pb-3">
                        <span className="font-bold text-slate-700">比赛级别</span>
                        <div className="italic font-black text-slate-800 flex items-center">
                            VTA<span className="text-vta-green ml-1">挑战赛</span>
                            <span className="text-[8px] bg-gray-100 text-gray-400 ml-1 px-1 rounded">CHALLENGE</span>
                        </div>
                    </div>
                    
                    <InfoRow label="开赛时间" value={tournament.startTime} />
                    <InfoRow label="报名时段" value={tournament.regPeriod} />
                    
                    <div className="flex items-start justify-between py-1">
                        <span className="text-slate-500 w-20 shrink-0">比赛地点</span>
                        <div className="flex-1 text-right flex items-center justify-end">
                            <span className="text-slate-800 font-medium mr-2 text-xs line-clamp-1">{tournament.location}</span>
                            <div className="flex items-center text-vta-green text-xs bg-vta-green/5 px-2 py-1 rounded-full">
                                <Navigation size={12} className="mr-1" /> 导航
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between py-1 pt-2 border-t border-gray-50">
                        <span className="text-slate-500">联系电话</span>
                        <div className="flex items-center text-slate-800 font-bold">
                            <Phone size={14} className="mr-2 text-vta-green" />
                            {tournament.phone}
                        </div>
                    </div>
                </div>

                {/* Event Items */}
                <div>
                    <div className="grid grid-cols-2 gap-3">
                        <EventItemCard title="男单" quota="1/16签" price={200} active />
                        <EventItemCard title="男双" quota="0/12签" price={300} />
                    </div>
                </div>

                {/* Description */}
                <div className="bg-white rounded-xl p-4 shadow-sm relative">
                    <SectionTitle title="赛事概述" />
                    <p className={cn(
                        "text-xs text-gray-600 leading-relaxed text-justify transition-all",
                        !showFullDescription && "line-clamp-3"
                    )}>
                        {tournament.description}
                    </p>
                    <button 
                        onClick={() => setShowFullDescription(!showFullDescription)}
                        className="flex items-center justify-center w-full mt-2 text-xs text-vta-green/80 pt-2 border-t border-gray-50"
                    >
                        {showFullDescription ? (
                            <>收起 <ChevronUp size={12} className="ml-1" /></>
                        ) : (
                            <>展开更多 <ChevronDown size={12} className="ml-1" /></>
                        )}
                    </button>
                </div>

                {/* Combined Rules Section */}
                <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
                    <div>
                        <SectionTitle title="参赛资格" />
                        <ul className="text-xs text-gray-600 space-y-1.5 list-disc pl-4">
                            {tournament.qualifications.map((q, i) => (
                                <li key={i}>{q}</li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="border-t border-gray-50 pt-4">
                        <SectionTitle title="赛事奖励" />
                        <div className="text-xs text-gray-600 space-y-1">
                            {tournament.awards.map((a, i) => (
                                <div key={i} className="flex items-center">
                                    <div className="w-1.5 h-1.5 rounded-full bg-vta-gold mr-2"></div>
                                    {a}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-gray-50 pt-4">
                        <div className="flex justify-between items-center mb-2" onClick={() => setShowDetailedRulesModal(true)}>
                            <SectionTitle title="退赛政策" noMargin />
                            <span className="text-[10px] text-gray-400 flex items-center cursor-pointer hover:text-orange-500 transition-colors">
                                详细规则 <ChevronDown size={10} className="-rotate-90 ml-0.5" />
                            </span>
                        </div>
                        <p className="text-xs text-[#FF6B00] bg-[#FFF8F2] p-3 rounded-lg leading-relaxed">
                            {tournament.refundPolicy}
                        </p>
                    </div>
                </div>
            </div>
        )}

        {/* Tab Content: Player List */}
        {activeTab === '选手名单' && (
            <div className="space-y-2 animate-in fade-in duration-300 pb-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-sm font-bold text-slate-800">
                            已报名 <span className="text-vta-green">{mockPlayers.filter(p => p.status === '已报名').length}</span>
                            <span className="text-gray-400 font-normal mx-1">/</span>
                            <span className="text-gray-400 text-xs font-normal">32</span>
                        </div>
                        <div className="text-xs text-gray-500">候补: {mockPlayers.filter(p => p.status === '候补').length}</div>
                    </div>
                    <div className="space-y-3">
                        {mockPlayers.map((player, index) => (
                            <div key={player.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                                <div className="flex items-center">
                                    <div className="w-6 text-center text-xs font-bold text-gray-300 mr-2">{index + 1}</div>
                                    <img src={player.avatar} alt={player.name} className="w-8 h-8 rounded-full bg-gray-100 mr-3" />
                                    <div>
                                        <div className="text-sm font-medium text-slate-800">{player.name}</div>
                                        <div className="text-[10px] text-gray-500">积分: {player.points}</div>
                                    </div>
                                </div>
                                <div className={cn(
                                    "text-xs px-2 py-0.5 rounded-full",
                                    player.status === '已报名' ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"
                                )}>
                                    {player.status}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}

        {/* Tab Content: Draw */}
        {activeTab === '签表' && (
            <div className="space-y-3 animate-in fade-in duration-300 pb-4">
                {/* Draw Sub-tabs */}
                <div className="flex p-1 bg-gray-200/50 rounded-lg mx-4 mb-2">
                    <button
                        onClick={() => setDrawTab('upcoming')}
                        className={cn(
                            "flex-1 py-1.5 text-xs font-bold rounded-md transition-all",
                            drawTab === 'upcoming' ? "bg-white text-slate-800 shadow-sm" : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        未开赛
                    </button>
                    <button
                        onClick={() => setDrawTab('finished')}
                        className={cn(
                            "flex-1 py-1.5 text-xs font-bold rounded-md transition-all",
                            drawTab === 'finished' ? "bg-white text-slate-800 shadow-sm" : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        完赛
                    </button>
                </div>

                {mockDraw.map((round, rIndex) => {
                    const filteredMatches = round.matches.filter(m => m.status === drawTab)
                    if (filteredMatches.length === 0) return null

                    return (
                        <div key={rIndex} className="bg-white rounded-xl p-4 shadow-sm">
                            <SectionTitle title={round.round} />
                            <div className="space-y-3">
                                {filteredMatches.map((match, mIndex) => (
                                    <div key={mIndex} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="text-xs text-gray-400">{match.id < 10 ? `Match 0${match.id + 1}` : `Match ${match.id + 1}`}</div>
                                            <div className={cn(
                                                "text-[10px] px-1.5 py-0.5 rounded",
                                                match.status === 'finished' ? "bg-gray-200 text-gray-500" : "bg-blue-50 text-blue-600"
                                            )}>
                                                {match.status === 'finished' ? '完赛' : '未开赛'}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className={cn("text-sm font-medium", match.status === 'finished' ? "text-slate-800" : "text-slate-600")}>{match.p1}</span>
                                                {match.status === 'finished' && <span className="font-bold text-slate-800">{match.score.split(':')[0]}</span>}
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className={cn("text-sm font-medium", match.status === 'finished' ? "text-slate-400" : "text-slate-600")}>{match.p2}</span>
                                                {match.status === 'finished' && <span className="font-bold text-slate-400">{match.score.split(':')[1]}</span>}
                                            </div>
                                        </div>
                                        {match.status !== 'finished' && (
                                            <div className="mt-2 text-center text-xs text-blue-500 font-medium bg-blue-50/50 py-1 rounded">
                                                VS
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
                
                {mockDraw.every(r => r.matches.filter(m => m.status === drawTab).length === 0) && (
                    <div className="py-12 text-center text-gray-400 text-xs">
                        <Info size={24} className="mx-auto mb-2 opacity-30" />
                        <p>暂无{drawTab === 'upcoming' ? '未开赛' : '完赛'}数据</p>
                    </div>
                )}
            </div>
        )}

        {/* Tab Content: Schedule */}
        {activeTab === '赛程' && (
            <div className="space-y-2 animate-in fade-in duration-300 pb-4">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-3 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                        <span className="font-bold text-sm text-slate-700">2026/01/20 周二</span>
                        <span className="text-xs text-gray-500">Day 1</span>
                    </div>
                    <div>
                        {mockSchedule.map((item, index) => (
                            <div key={index} className="flex p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                                <div className="mr-4 flex flex-col items-center justify-center w-12 shrink-0">
                                    <span className="text-sm font-bold text-slate-800">{item.time}</span>
                                    <span className="text-[10px] text-gray-400 mt-1 bg-gray-100 px-1 rounded">{item.court}</span>
                                </div>
                                <div className="flex-1 border-l border-gray-100 pl-4">
                                    <div className="text-xs text-vta-gold font-medium mb-1">{item.round}</div>
                                    <div className="text-sm font-bold text-slate-700 mb-1">{item.match}</div>
                                    <div className="flex items-center mt-2">
                                        <div className={cn(
                                            "w-2 h-2 rounded-full mr-2",
                                            item.status === 'finished' ? "bg-gray-300" : "bg-green-500 animate-pulse"
                                        )}></div>
                                        <span className="text-xs text-gray-500">
                                            {item.status === 'finished' ? '已结束' : '进行中/即将开始'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3 pb-safe z-50">
         <div className="flex items-center justify-start mb-3">
            <div 
                className="flex items-center text-xs text-gray-500 cursor-pointer select-none group" 
                onClick={() => setAgree(!agreed)}
            >
                {agreed ? (
                    <CheckCircle2 size={18} className="text-[#FF6600] mr-2 shrink-0" /> 
                ) : (
                    <Circle size={18} className="text-gray-400 mr-2 shrink-0 group-hover:text-gray-600 transition-colors" />
                )}
                <span>我已阅读并同意</span>
                <span 
                    className="text-slate-800 font-bold underline ml-1 cursor-pointer hover:text-[#FF6600] transition-colors"
                    onClick={(e) => {
                        e.stopPropagation()
                        setShowRulesModal(true)
                    }}
                >
                    《报名须知》
                </span>
            </div>
         </div>
         <div className="flex items-center space-x-4 pb-4">
            {/* <div className="flex flex-col items-center justify-center w-12 text-gray-500 hover:text-slate-800 transition-colors cursor-pointer">
                <Share2 size={22} />
                <span className="text-[10px] mt-1 font-medium">分享</span>
            </div>
            <div className="flex flex-col items-center justify-center w-12 text-gray-500 hover:text-red-500 transition-colors cursor-pointer">
                <Heart size={22} />
                <span className="text-[10px] mt-1 font-medium">关注</span>
            </div> */}
            <button 
                onClick={handleRegisterClick}
                className={cn(
                    "flex-1 h-12 rounded-full font-bold text-[16px] tracking-wide transition-all duration-300 flex items-center justify-center border",
                    agreed 
                        ? "bg-gray-800 text-white  hover:scale-[1.02] active:scale-95" 
                        : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
                )}
            >
                <span>立即报名</span>
            </button>
         </div>
      </div>

      {/* Rules Modal */}
      {showRulesModal && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowRulesModal(false)}></div>
              <div className="bg-white w-full max-w-sm rounded-2xl relative z-10 animate-in zoom-in-95 duration-200 max-h-[80vh] flex flex-col">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="text-lg font-bold text-slate-800">报名须知</h3>
                      <button onClick={() => setShowRulesModal(false)} className="text-gray-400 hover:text-slate-800">
                          <X size={20} />
                      </button>
                  </div>
                  <div className="p-8 overflow-y-auto">
                      <div className="space-y-6 text-sm text-gray-600">
                          <div>
                              <h4 className="font-bold text-slate-900 text-[15px] mb-2">1. 报名要求</h4>
                              <p className="leading-relaxed">所有参赛选手必须符合本次赛事的年龄和资格限制。请确保您填写的个人信息真实有效，否则组委会将保留取消您参赛资格的权利。</p>
                          </div>
                          <div>
                              <h4 className="font-bold text-slate-900 text-[15px] mb-2">2. 健康声明</h4>
                              <p className="leading-relaxed">参赛选手应确保身体健康，无不适合剧烈运动的疾病。比赛期间如出现身体不适，应立即停止比赛并向工作人员寻求帮助。</p>
                          </div>
                          <div>
                              <h4 className="font-bold text-slate-900 text-[15px] mb-2">3. 免责协议</h4>
                              <p className="leading-relaxed">报名即视为自愿参赛并承担比赛可能带来的风险。赛事主办方不对比赛期间发生的意外伤害承担法律责任。</p>
                          </div>
                          <div>
                              <h4 className="font-bold text-slate-900 text-[15px] mb-2">4. 肖像权</h4>
                              <p className="leading-relaxed">组委会有权无偿使用参赛选手的比赛照片、视频等影像资料用于赛事宣传和推广。</p>
                          </div>
                      </div>
                  </div>
                  <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
                      <button 
                          onClick={() => {
                              setAgree(true)
                              setShowRulesModal(false)
                          }}
                          className="w-full bg-vta-dark text-white font-bold py-3 rounded-xl hover:bg-black transition-colors"
                      >
                          我已阅读并同意
                      </button>
                  </div>
              </div>
          </div>
      )}

      {/* Detailed Rules Modal */}
      {showDetailedRulesModal && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDetailedRulesModal(false)}></div>
              <div className="bg-white w-full max-w-sm rounded-2xl relative z-10 animate-in zoom-in-95 duration-200 max-h-[80vh] flex flex-col">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="text-lg font-bold text-slate-800">详细规则</h3>
                      <button onClick={() => setShowDetailedRulesModal(false)} className="text-gray-400 hover:text-slate-800">
                          <X size={20} />
                      </button>
                  </div>
                  <div className="p-8 overflow-y-auto">
                      <div className="space-y-6 text-sm text-gray-600">
                          <div>
                              <h4 className="font-bold text-slate-900 text-[15px] mb-2">
                                  赛制说明
                              </h4>
                              <p className="leading-relaxed text-sm">
                                  1. 小组赛阶段：采用分组循环赛，每组4人，前2名晋级。<br/>
                                  2. 淘汰赛阶段：采用单败淘汰制，直至决出冠军。<br/>
                                  3. 比赛采用一盘6局无占先制（NO-AD），6-6时抢七决胜。
                              </p>
                          </div>
                          <div>
                              <h4 className="font-bold text-slate-900 text-[15px] mb-2">
                                  退赛与退费
                              </h4>
                              <p className="leading-relaxed text-sm">
                                  1. 比赛开始前24小时以上申请退赛，报名费全额退还。<br/>
                                  2. 比赛开始前24小时以内申请退赛，报名费不予退还，但在自行找到替补选手的情况下可以转让名额。<br/>
                                  3. 比赛开始后因伤退赛，报名费不予退还。
                              </p>
                          </div>
                          <div>
                              <h4 className="font-bold text-slate-900 text-[15px] mb-2">
                                  积分规则
                              </h4>
                              <p className="leading-relaxed text-sm">
                                  冠军：1000分<br/>
                                  亚军：600分<br/>
                                  四强：360分<br/>
                                  八强：180分<br/>
                                  小组出线：90分<br/>
                                  参与分：10分
                              </p>
                          </div>
                          <div>
                              <h4 className="font-bold text-slate-900 text-[15px] mb-2">
                                  其他事项
                              </h4>
                              <p className="leading-relaxed text-sm">
                                  1. 请参赛选手提前30分钟到达现场签到。<br/>
                                  2. 比赛用球由组委会提供（Head Tour XT）。<br/>
                                  3. 最终解释权归VTA组委会所有。
                              </p>
                          </div>
                      </div>
                  </div>
                  <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
                      <button 
                          onClick={() => setShowDetailedRulesModal(false)}
                          className="w-full bg-white border border-gray-200 text-slate-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                          我知道了
                      </button>
                  </div>
              </div>
          </div>
      )}

      {/* Eligibility Modal */}
      {showEligibilityModal && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowEligibilityModal(false)}></div>
            <div className="bg-vta-dark w-full max-w-md rounded-t-2xl sm:rounded-2xl p-6 relative z-10 animate-in slide-in-from-bottom duration-300">
                <button 
                    onClick={() => setShowEligibilityModal(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white"
                >
                    <X size={20} />
                </button>
                
                <h3 className="text-center text-white text-lg font-bold mb-8">报名</h3>
                
                <div className="space-y-4 mb-8">
                    <div className="flex items-start">
                        <div className="bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded mr-3 mt-0.5 shrink-0">资格限制</div>
                        <div className="text-xs text-gray-300 leading-relaxed space-y-1">
                            <p>纯业余选手(年龄18~60岁);</p>
                            <p>本站谢绝专业或职业选手(含注册过，含已退役);</p>
                            <p>持证网球专业国家一二三级运动员;</p>
                            <p>高校高水平网球运动员、网球教练员(含兼职);</p>
                            <p>以及VTA积分排名前十球员。</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center">
                        <div className="bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded mr-3 shrink-0">性别限制</div>
                        <div className="text-xs text-gray-300">不限</div>
                    </div>
                </div>

                <button 
                    onClick={handleConfirmRegistration}
                    className="w-full bg-orange-600 text-white font-bold py-3 rounded-full hover:bg-orange-500 transition-colors"
                >
                    确认报名
                </button>
            </div>
        </div>
      )}
    </div>
  )
}

function InfoRow({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex justify-between items-center py-1">
            <span className="text-slate-500">{label}</span>
            <span className="text-slate-800 font-medium text-right">{value}</span>
        </div>
    )
}

function SectionTitle({ title, noMargin }: { title: string, noMargin?: boolean }) {
    return (
        <div className={cn(
            "inline-block bg-gray-100 text-slate-600 text-xs font-bold px-3 py-1 rounded",
            !noMargin && "mb-3"
        )}>
            {title}
        </div>
    )
}

function EventItemCard({ title, quota, price, active }: any) {
    return (
        <div className={cn(
            "rounded-xl p-3 border-2 transition-all cursor-pointer relative overflow-hidden",
            active ? "bg-vta-dark border-vta-dark text-white" : "bg-white border-white text-slate-800 shadow-sm"
        )}>
            <div className="text-sm font-bold mb-2">{title}</div>
            <div className="flex justify-between items-end">
                <div className="text-xs opacity-70 flex items-center">
                    <Users size={12} className="mr-1" /> {quota}
                </div>
                <div className={cn(
                    "text-lg font-bold",
                    active ? "text-orange-500" : "text-orange-600"
                )}>
                    <span className="text-xs font-normal mr-0.5">¥</span>{price}
                </div>
            </div>
        </div>
    )
}
