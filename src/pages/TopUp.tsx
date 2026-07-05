import { useState, useEffect } from 'react'
import { Search, Phone, ChevronRight } from 'lucide-react'

const countries = [
  { code: 'US', name: 'United States', flag: '\u{1F1FA}\u{1F1F8}' },
  { code: 'GB', name: 'United Kingdom', flag: '\u{1F1EC}\u{1F1E7}' },
  { code: 'SA', name: 'Saudi Arabia', flag: '\u{1F1F8}\u{1F1E6}' },
  { code: 'AE', name: 'UAE', flag: '\u{1F1E6}\u{1F1EA}' },
  { code: 'YE', name: 'Yemen', flag: '\u{1F1FE}\u{1F1EA}' },
  { code: 'EG', name: 'Egypt', flag: '\u{1F1EA}\u{1F1EC}' },
  { code: 'IN', name: 'India', flag: '\u{1F1EE}\u{1F1F3}' },
  { code: 'PH', name: 'Philippines', flag: '\u{1F1F5}\u{1F1ED}' },
  { code: 'NG', name: 'Nigeria', flag: '\u{1F1F3}\u{1F1EC}' },
  { code: 'BR', name: 'Brazil', flag: '\u{1F1E7}\u{1F1F7}' },
  { code: 'DE', name: 'Germany', flag: '\u{1F1E9}\u{1F1EA}' },
  { code: 'FR', name: 'France', flag: '\u{1F1EB}\u{1F1F7}' },
]

const amounts = [5, 10, 20, 50, 100, 200]

export default function TopUp() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<typeof countries[0] | null>(null)
  const [phone, setPhone] = useState('')
  const [amount, setAmount] = useState(10)
  const [step, setStep] = useState<1 | 2>(1)

  const filtered = countries.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="h-full flex flex-col animate-fade-in">
      {/* Header */}
      <div className="px-5 pt-6 pb-3">
        <h1 className="text-xl font-bold text-white">Top Up</h1>
        <p className="text-gray-400 text-sm mt-0.5">Send mobile credit worldwide</p>
      </div>

      {step === 1 ? (
        <div className="flex-1 overflow-y-auto px-5">
          <div className="relative mb-4">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text" placeholder="Search country..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-gray-800/60 border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition text-sm"
            />
          </div>
          <div className="space-y-2">
            {filtered.map(c => (
              <button key={c.code} onClick={() => { setSelected(c); setStep(2) }}
                className="w-full bg-gray-800/40 rounded-xl p-3.5 flex items-center justify-between active:bg-gray-700/50 transition">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{c.flag}</span>
                  <span className="text-sm font-medium text-white">{c.name}</span>
                </div>
                <ChevronRight size={18} className="text-gray-600" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-5">
          <button onClick={() => setStep(1)} className="text-purple-400 text-sm mb-4 font-medium">
            &larr; Back to countries
          </button>

          <div className="flex items-center gap-3 bg-gray-800/40 rounded-xl p-4 mb-6">
            <span className="text-3xl">{selected?.flag}</span>
            <div>
              <p className="text-white font-medium">{selected?.name}</p>
              <p className="text-gray-400 text-xs">Select operator below</p>
            </div>
          </div>

          <div className="relative mb-5">
            <Phone size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="tel" placeholder="Phone number" value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full bg-gray-800/60 border border-gray-700 rounded-xl py-3.5 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
            />
          </div>

          <h3 className="text-sm font-medium text-gray-400 mb-3">Select Amount</h3>
          <div className="grid grid-cols-3 gap-2.5 mb-6">
            {amounts.map(a => (
              <button key={a} onClick={() => setAmount(a)}
                className={`py-3 rounded-xl text-center font-semibold transition ${
                  amount === a ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/30' : 'bg-gray-800/60 text-gray-300'
                }`}>
                ${a}
              </button>
            ))}
          </div>

          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition">
            Top Up ${amount}.00
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  )
}
