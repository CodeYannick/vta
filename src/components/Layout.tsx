import { Home, Trophy, BarChart3, User } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  
  const tabs = [
    { name: '首页', path: '/', icon: Home },
    { name: '赛事', path: '/tournaments', icon: Trophy },
    { name: '生涯', path: '/career', icon: BarChart3 },
    { name: '我的', path: '/my', icon: User },
  ]

  const showBottomNav = tabs.map(t => t.path).includes(location.pathname)

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50 shadow-2xl overflow-hidden relative">
      {/* Main Content Area */}
      <div className={cn("flex-1 overflow-y-auto scrollbar-hide", showBottomNav && "pb-20")}>
        {children}
      </div>

      {/* Bottom Navigation */}
      {showBottomNav && (
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-safe z-50">
          <div className="flex justify-around items-center h-14">
            {tabs.map((tab) => {
              const isActive = location.pathname === tab.path
              return (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className="flex flex-col items-center justify-center w-full h-full space-y-1"
                >
                  <tab.icon
                    size={24}
                    className={cn(
                      "transition-colors",
                      isActive ? "text-vta-green fill-current" : "text-gray-400"
                    )}
                  />
                  <span
                    className={cn(
                      "text-[10px] font-medium",
                      isActive ? "text-vta-green" : "text-gray-400"
                    )}
                  >
                    {tab.name}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
