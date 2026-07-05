import { useLocation, useNavigate } from 'react-router-dom'
import { Home, Smartphone, Gift, Wallet as WalletIcon } from 'lucide-react'

const tabs = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/topup', icon: Smartphone, label: 'Top Up' },
  { path: '/giftcards', icon: Gift, label: 'Cards' },
  { path: '/wallet', icon: WalletIcon, label: 'Wallet' },
]

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-t border-gray-800 z-50 safe-area-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {tabs.map(tab => {
          const active = location.pathname === tab.path
          const Icon = tab.icon
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${
                active ? 'text-purple-500' : 'text-gray-500'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all ${active ? 'bg-purple-500/15 scale-110' : ''}`}>
                <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
              </div>
              <span className={`text-[10px] mt-0.5 ${active ? 'font-semibold' : 'font-medium'}`}>
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
