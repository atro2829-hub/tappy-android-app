import { useEffect, useState } from 'react'
import { useAppStore } from '../store/appStore'
import { Plus, ArrowDownLeft, ArrowUpRight, Filter, Zap } from 'lucide-react'

export default function Wallet() {
  const { wallet, transactions, fetchWallet, fetchTransactions } = useAppStore()
  const [filter, setFilter] = useState<'all' | 'credit' | 'debit'>('all')

  useEffect(() => { fetchWallet(); fetchTransactions() }, [])

  const filtered = filter === 'all' ? transactions : transactions.filter(t => t.type === filter)

  return (
    <div className="h-full flex flex-col animate-fade-in">
      <div className="px-5 pt-6 pb-3">
        <h1 className="text-xl font-bold text-white">Wallet</h1>
        <p className="text-gray-400 text-sm mt-0.5">Manage your funds</p>
      </div>

      {/* Balance */}
      <div className="mx-5 mb-5 bg-gradient-to-br from-purple-600 via-purple-700 to-violet-800 rounded-2xl p-6 shadow-lg shadow-purple-900/30">
        <p className="text-purple-200 text-sm">Available Balance</p>
        <p className="text-4xl font-bold text-white mt-1">${wallet.balance.toFixed(2)}</p>
        <p className="text-purple-300 text-xs mt-1">{wallet.currency}</p>
        <div className="flex gap-3 mt-5">
          <button className="flex-1 bg-white/15 backdrop-blur-sm rounded-xl py-3 text-sm font-medium text-white flex items-center justify-center gap-2 active:scale-95 transition">
            <Plus size={16} /> Add Money
          </button>
          <button className="flex-1 bg-white/15 backdrop-blur-sm rounded-xl py-3 text-sm font-medium text-white flex items-center justify-center gap-2 active:scale-95 transition">
            <ArrowUpRight size={16} /> Withdraw
          </button>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 px-5 mb-3">
        {(['all', 'credit', 'debit'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              filter === f ? 'bg-purple-600 text-white' : 'bg-gray-800/60 text-gray-400'
            }`}>
            {f === 'all' ? 'All' : f === 'credit' ? 'Income' : 'Expense'}
          </button>
        ))}
      </div>

      {/* Transactions */}
      <div className="flex-1 overflow-y-auto px-5 pb-4">
        <h3 className="text-sm font-semibold text-gray-400 mb-3">Transaction History</h3>
        {filtered.length === 0 ? (
          <div className="bg-gray-800/40 rounded-2xl p-8 text-center">
            <Zap size={32} className="text-gray-600 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">No transactions found</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {filtered.map(tx => (
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
