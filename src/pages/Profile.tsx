import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { User, Shield, Bell, CreditCard, HelpCircle, LogOut, ChevronRight, Moon } from 'lucide-react'

const menuItems = [
  { icon: User, label: 'My Account', desc: 'Personal information' },
  { icon: Shield, label: 'Security', desc: 'Password & 2FA' },
  { icon: Bell, label: 'Notifications', desc: 'Push & email alerts' },
  { icon: CreditCard, label: 'Payment Methods', desc: 'Cards & wallets' },
  { icon: Moon, label: 'Appearance', desc: 'Theme & display' },
  { icon: HelpCircle, label: 'Help & Support', desc: 'FAQ & contact' },
]

export default function Profile() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div className="h-full overflow-y-auto pb-4 animate-fade-in">
      <div className="px-5 pt-6 pb-3">
        <h1 className="text-xl font-bold text-white">Profile</h1>
      </div>

      {/* User Card */}
      <div className="mx-5 mb-6 bg-gray-800/50 rounded-2xl p-5 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">{user?.name?.charAt(0)?.toUpperCase() ?? 'U'}</span>
        </div>
        <div className="flex-1">
          <p className="text-lg font-semibold text-white">{user?.name ?? 'User'}</p>
          <p className="text-sm text-gray-400">{user?.email ?? ''}</p>
          <p className="text-xs text-purple-400 mt-0.5 capitalize">{user?.role ?? 'customer'}</p>
        </div>
      </div>

      {/* Menu */}
      <div className="mx-5 bg-gray-800/30 rounded-2xl overflow-hidden">
        {menuItems.map((item, i) => {
          const Icon = item.icon
          return (
            <button key={item.label}
              className={`w-full flex items-center gap-4 p-4 text-left active:bg-gray-700/30 transition ${
                i < menuItems.length - 1 ? 'border-b border-gray-800' : ''
              }`}>
              <div className="w-10 h-10 bg-gray-700/50 rounded-xl flex items-center justify-center">
                <Icon size={18} className="text-gray-300" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{item.label}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
              <ChevronRight size={16} className="text-gray-600" />
            </button>
          )
        })}
      </div>

      {/* Logout */}
      <div className="mx-5 mt-5">
        <button onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 font-medium py-3.5 rounded-xl active:scale-[0.98] transition">
          <LogOut size={18} />
          Sign Out
        </button>
      </div>

      <p className="text-center text-gray-600 text-xs mt-6">Tappy v1.0.0</p>
    </div>
  )
}
