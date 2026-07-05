import { WifiOff } from 'lucide-react'

export default function OfflineBanner() {
  return (
    <div className="bg-amber-600 text-white text-center text-xs py-1.5 px-4 flex items-center justify-center gap-2 z-[60] relative">
      <WifiOff size={14} />
      <span>You are offline. Showing cached data.</span>
    </div>
  )
}
