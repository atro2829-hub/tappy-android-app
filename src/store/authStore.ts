import { Preferences } from '@capacitor/preferences'
import { create } from 'zustand'
import api from '../services/api'
import { setItem, getItem, setCache, getCache } from '../services/cache'
import type { User } from '../store/types'

interface AuthState {
  token: string | null
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  loadCached: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  loading: false,

  login: async (email, password) => {
    set({ loading: true })
    try {
      const { data } = await api.post('/login', { email, password })
      const token = data.token
      const user: User = data.user ?? { id: 1, name: 'User', email, role: 'customer' }
      await setItem('token', token)
      await setCache('user', user)
      set({ token, user, loading: false })
      return true
    } catch {
      set({ loading: false })
      return false
    }
  },

  register: async (name, email, password) => {
    set({ loading: true })
    try {
      const { data } = await api.post('/register', { name, email, password })
      const token = data.token
      const user: User = data.user ?? { id: 1, name, email, role: 'customer' }
      await setItem('token', token)
      await setCache('user', user)
      set({ token, user, loading: false })
      return true
    } catch {
      set({ loading: false })
      return false
    }
  },

  logout: async () => {
    await Preferences.remove({ key: 'token' })
    await Preferences.remove({ key: 'cache_user' })
    set({ token: null, user: null })
  },

  loadCached: async () => {
    const token = await getItem('token')
    const user = await getCache<User>('user')
    if (token && user) set({ token, user })
  },
}))
