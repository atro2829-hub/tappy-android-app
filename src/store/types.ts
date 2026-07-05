export interface User {
  id: number
  name: string
  email: string
  role: string
  status?: string
}

export interface Transaction {
  id: number
  type: 'credit' | 'debit'
  amount: number
  description: string
  status: string
  created_at: string
}

export interface Country {
  code: string
  name: string
  flag: string
  operators: Operator[]
}

export interface Operator {
  id: string
  name: string
  logo?: string
}

export interface GiftCard {
  id: number
  name: string
  category: string
  price: number
  currency: string
  image?: string
  color: string
}

export interface WalletData {
  balance: number
  currency: string
}
