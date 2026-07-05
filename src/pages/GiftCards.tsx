import { useState } from 'react'
import { Search } from 'lucide-react'

const categories = ['All', 'Gaming', 'Shopping', 'Entertainment', 'Food', 'Travel']

const cards = [
  { id: 1, name: 'PlayStation', category: 'Gaming', price: 25, color: 'from-blue-600 to-blue-800' },
  { id: 2, name: 'Xbox', category: 'Gaming', price: 25, color: 'from-green-600 to-green-800' },
  { id: 3, name: 'Steam', category: 'Gaming', price: 20, color: 'from-gray-600 to-gray-800' },
  { id: 4, name: 'Amazon', category: 'Shopping', price: 50, color: 'from-amber-500 to-orange-600' },
  { id: 5, name: 'Google Play', category: 'Entertainment', price: 15, color: 'from-sky-500 to-sky-700' },
  { id: 6, name: 'Netflix', category: 'Entertainment', price: 30, color: 'from-red-600 to-red-800' },
  { id: 7, name: 'Spotify', category: 'Entertainment', price: 15, color: 'from-green-500 to-green-700' },
  { id: 8, name: 'Uber Eats', category: 'Food', price: 25, color: 'from-lime-500 to-green-600' },
  { id: 9, name: 'Apple', category: 'Shopping', price: 50, color: 'from-gray-700 to-gray-900' },
  { id: 10, name: 'Airbnb', category: 'Travel', price: 100, color: 'from-rose-500 to-rose-700' },
]

export default function GiftCards() {
  const [cat, setCat] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = cards.filter(c => {
    const matchCat = cat === 'All' || c.category === cat
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="h-full flex flex-col animate-fade-in">
      <div className="px-5 pt-6 pb-3">
        <h1 className="text-xl font-bold text-white">Gift Cards</h1>
        <p className="text-gray-400 text-sm mt-0.5">Browse and buy gift cards</p>
      </div>

      <div className="px-5 mb-3">
        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input type="text" placeholder="Search cards..." value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-gray-800/60 border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition text-sm" />
        </div>
      </div>

      <div className="flex gap-2 px-5 overflow-x-auto pb-3 no-scrollbar">
        {categories.map(c => (
          <button key={c} onClick={() => setCat(c)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition ${
              cat === c ? 'bg-purple-600 text-white' : 'bg-gray-800/60 text-gray-400'
            }`}>
            {c}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-4">
        <div className="grid grid-cols-2 gap-3">
          {filtered.map(card => (
            <div key={card.id} className="bg-gray-800/40 rounded-2xl overflow-hidden active:scale-[0.97] transition cursor-pointer">
              <div className={`h-24 bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                <span className="text-white font-bold text-lg">{card.name}</span>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-white">{card.name}</p>
                <div className="flex items-center justify-between mt-1.5">
                  <p className="text-purple-400 font-bold text-base">${card.price}</p>
                  <button className="bg-purple-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg active:scale-95 transition">
                    Buy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
