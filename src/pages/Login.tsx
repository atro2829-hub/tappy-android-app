import { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { Mail, Lock, Eye, EyeOff, ArrowRight, UserPlus } from 'lucide-react'

export default function Login() {
  const { login, register, loading } = useAuthStore()
  const [isRegister, setIsRegister] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setError('')
    if (!email || !password) { setError('Please fill all fields'); return }
    if (isRegister && !name) { setError('Please enter your name'); return }
    const ok = isRegister ? await register(name, email, password) : await login(email, password)
    if (!ok) setError(isRegister ? 'Registration failed' : 'Invalid email or password')
  }

  return (
    <div className="h-full flex flex-col justify-center px-8 animate-fade-in">
      <div className="mb-10 text-center">
        <div className="w-20 h-20 mx-auto mb-4 bg-purple-600 rounded-2xl flex items-center justify-center animate-pulse-glow">
          <span className="text-3xl font-bold text-white">T</span>
        </div>
        <h1 className="text-2xl font-bold text-white">Welcome to Tappy</h1>
        <p className="text-gray-400 mt-1 text-sm">Global Top-ups & Gift Cards</p>
      </div>

      {error && (
        <div className="bg-red-500/15 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3 mb-5 text-center">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {isRegister && (
          <div className="relative">
            <UserPlus size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text" placeholder="Full Name" value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-gray-800/60 border border-gray-700 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
            />
          </div>
        )}

        <div className="relative">
          <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="email" placeholder="Email address" value={email}
            onChange={e => setEmail(e.target.value)} autoComplete="email"
            className="w-full bg-gray-800/60 border border-gray-700 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
          />
        </div>

        <div className="relative">
          <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type={showPass ? 'text' : 'password'} placeholder="Password" value={password}
            onChange={e => setPassword(e.target.value)} autoComplete={isRegister ? 'new-password' : 'current-password'}
            className="w-full bg-gray-800/60 border border-gray-700 rounded-xl py-3.5 pl-11 pr-11 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
          />
          <button onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button
          onClick={handleSubmit} disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition active:scale-[0.98]"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              {isRegister ? 'Create Account' : 'Sign In'}
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}
          <button onClick={() => { setIsRegister(!isRegister); setError('') }} className="text-purple-400 font-medium ml-1">
            {isRegister ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  )
}
