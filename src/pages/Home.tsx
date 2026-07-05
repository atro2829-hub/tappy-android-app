import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useAppStore } from '../store/appStore'
import { Bell, Send, Download, Smartphone, CreditCard, ArrowUpRight, ArrowDownLeft, Zap } from 'lucide-react'

const quickActions = [
  { icon: Smartphone, label: 'Top Up', color: 'from-blue-500 to-blue-600', path: '/topup' },
  { icon: CreditCard, label: 'Gift Cards', color: 'from-pink-500 to-pink-600', path: '/giftcards' },
  { icon: Send, label: 'Send', color: 'from-emerald-500 to-emerald-600', path: '/wallet' },
  { icon: Download, label: 'Receive', color: 'from-amber-500 to-amber-600', path: '/wallet' },
]

export default function Home() {
  const { user } = useAuthStore()
  const { wallet, transactions, fetchWallet, fetchTransactions } = useAppStore()
  const navigate = useNavigate()

  useEffect(() => { fetchWallet(); fetchTransactions() }, [])

  return (
    <div className="h-full overflow-y-auto pb-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div>
          <p className="text-gray-400 text-sm">Hello,</p>
          <h1 className="text-xl font-bold text-white">{user?.name ?? 'User'}</h1>
        </div>
        <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
          <Bell size={20} className="text-gray-400" />
        </button>
      </div>

      {/* Balance Card */}
      <div className="mx-5 mt-4 bg-gradient-to-br from-purple-600 via-purple-700 to-violet-800 rounded-2xl p-5 shadow-lg shadow-purple-900/30">
        <p className="text-purple-200 text-sm">Total Balance</p>
        <p className="text-3xl font-bold text-white mt-1">
          ${wallet.balance.toFixed(2)}
        </p>
        <p className="text-purple-300 text-xs mt-1">{wallet.currency} Wallet</p>
        <div className="flex gap-3 mt-5">
          <button className="flex-1 bg-white/15 backdrop-blur-sm rounded-xl py-2.5 text-sm font-medium text-white flex items-center justify-center gap-1.5 active:scale-95 transition">
            <ArrowUpRight size={16} /> Send
          </button>
          <button className="flex-1 bg-white/15 backdrop-blur-sm rounded-xl py-2.5 text-sm font-medium text-white flex items-center justify-center gap-1.5 active:scale-95 transition">
            <ArrowDownLeft size={16} /> Receive
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-5 mt-7">
        <h2 className="text-base font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map(a => {
            const Icon = a.icon
            return (
              <button key={a.label} onClick={() => navigate(a.path)}
                className="flex flex-col items-center gap-2 active:scale-95 transition">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${a.color} flex items-center justify-center shadow-lg`}>
                  <Icon size={22} className="text-white" />
                </div>
                <span className="text-xs text-gray-300 font-medium">{a.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="px-5 mt-7">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-white">Recent Activity</h2>
          <button onClick={() => navigate('/wallet')} className="text-purple-400 text-sm">See All</button>
        </div>
        {transactions.length === 0 ? (
          <div className="bg-gray-800/40 rounded-2xl p-8 text-center">
            <Zap size={32} className="text-gray-600 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">No transactions yet</p>
            <p className="text-gray-600 text-xs mt-1">Start by topping up your wallet</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {transactions.slice(0, 5).map(tx => (
              <div key={tx.id} className="bg-gray-800/40 rounded-xl p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    tx.type === 'credit' ? 'bg-emerald-500/15' : 'bg-red-500/15'
                  }`}>
                    {tx.type === 'credit' 
                      ? <ArrowDownLeft size={18} className="text-emerald-400" />
                      : <ArrowUpRight size={18} className="text-red-400" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{tx.description}</p>
                    <p className="text-xs text-gray-500">{tx.created_at}</p>
                  </div>
                </div>
                <p className={`text-sm font-semibold ${tx.type === 'credit' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {tx.type === 'credit' ? '+' : '-'}${tx.amount.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
