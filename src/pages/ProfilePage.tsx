import { ArrowLeft, Camera, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function ProfilePage() {
  const navigate = useNavigate()

  return (
    <div className="bg-gray-50 min-h-full">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft size={20} className="text-slate-800" />
        </button>
        <h1 className="text-base font-bold text-slate-800">个人资料</h1>
        <button className="text-sm text-vta-green font-medium" onClick={() => navigate(-1)}>保存</button>
      </div>

      <div className="p-4 space-y-4">
        {/* Avatar */}
        <div className="bg-white rounded-xl p-6 flex flex-col items-center justify-center space-y-3 shadow-sm">
            <div className="w-24 h-24 rounded-full bg-gray-200 relative overflow-hidden border-4 border-gray-100 shadow-lg">
                <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=250&auto=format&fit=crop" alt="Avatar" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera className="text-white" />
                </div>
            </div>
            <span className="text-xs text-gray-500">点击更换头像</span>
        </div>

        {/* Info Form */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <MenuItem label="昵称" value="微信用户" />
            <MenuItem label="真实姓名" value="李林峰" />
            <MenuItem label="性别" value="男" />
            <MenuItem label="出生日期" value="1995-08-15" />
            <MenuItem label="手机号码" value="138****8888" />
            <MenuItem label="身份证号" value="510107********1234" />
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <MenuItem label="持拍手" value="右手" />
            <MenuItem label="反手" value="双手" />
            <MenuItem label="球龄" value="3年" />
            <MenuItem label="NTRP级别" value="3.0" />
        </div>
      </div>
    </div>
  )
}

function MenuItem({ label, value }: any) {
    return (
        <div className="flex items-center justify-between p-4 border-b border-gray-50 last:border-0 active:bg-gray-50 transition-colors cursor-pointer">
            <span className="text-sm text-slate-800">{label}</span>
            <div className="flex items-center text-sm text-gray-500">
                <span>{value}</span>
                <ChevronRight size={16} className="ml-1 text-gray-300" />
            </div>
        </div>
    )
}
