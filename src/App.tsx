import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Network } from '@capacitor/network'
import { SplashScreen } from '@capacitor/splash-screen'
import { StatusBar } from '@capacitor/status-bar'
import { useAuthStore } from './store/authStore'
import BottomNav from './components/BottomNav'
import OfflineBanner from './components/OfflineBanner'
import Login from './pages/Login'
import Home from './pages/Home'
import TopUp from './pages/TopUp'
import GiftCards from './pages/GiftCards'
import Wallet from './pages/Wallet'
import Profile from './pages/Profile'

export default function App() {
  const { token } = useAuthStore()
  const [online, setOnline] = useState(true)

  useEffect(() => {
    const init = async () => {
      try {
        await StatusBar.setStyle({ style: 'LIGHT' })
        await StatusBar.setBackgroundColor({ color: '#7C3AED' })
      } catch {}
      try {
        const status = await Network.getStatus()
        setOnline(status.connected)
        Network.addListener('networkStatusChange', s => setOnline(s.connected))
      } catch {}
      try { await SplashScreen.hide() } catch {}
    }
    init()
  }, [])

  return (
    <div className="h-full flex flex-col bg-gray-950">
      {!online && <OfflineBanner />}
      <div className="flex-1 overflow-hidden">
        {!token ? (
          <Login />
        ) : (
          <BrowserRouter>
            <div className="h-full flex flex-col pb-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/topup" element={<TopUp />} />
                <Route path="/giftcards" element={<GiftCards />} />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
            <BottomNav />
          </BrowserRouter>
        )}
      </div>
    </div>
  )
}
