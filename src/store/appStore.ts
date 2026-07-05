import { create } from 'zustand'
import { setCache, getCache } from '../services/cache'
import type { Transaction, GiftCard, WalletData } from './types'
import api from '../services/api'

interface AppState {
  transactions: Transaction[]
  giftCards: GiftCard[]
  wallet: WalletData
  loading: boolean
  fetchTransactions: () => Promise<void>
  fetchGiftCards: () => Promise<void>
  fetchWallet: () => Promise<void>
}

const defaultWallet: WalletData = { balance: 0, currency: 'USD' }

export const useAppStore = create<AppState>((set) => ({
  transactions: [],
  giftCards: [],
  wallet: defaultWallet,
  loading: false,

  fetchTransactions: async () => {
    try {
      const { data } = await api.get('/api/transactions')
      const txns: Transaction[] = data.data ?? data ?? []
      await setCache('transactions', txns)
      set({ transactions: txns })
    } catch {
      const cached = await getCache<Transaction[]>('transactions')
      if (cached) set({ transactions: cached })
    }
  },

  fetchGiftCards: async () => {
    try {
      const { data } = await api.get('/api/gift-cards')
      const cards: GiftCard[] = data.data ?? data ?? []
      await setCache('giftCards', cards)
      set({ giftCards: cards })
    } catch {
      const cached = await getCache<GiftCard[]>('giftCards')
      if (cached) set({ giftCards: cached })
    }
  },

  fetchWallet: async () => {
    try {
      const { data } = await api.get('/api/wallet')
      const wallet: WalletData = data.data ?? data ?? defaultWallet
      await setCache('wallet', wallet)
      set({ wallet })
    } catch {
      const cached = await getCache<WalletData>('wallet')
      if (cached) set({ wallet: cached })
    }
  },
}))
