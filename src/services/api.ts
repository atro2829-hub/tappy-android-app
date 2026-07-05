import axios from 'axios'
import { Preferences } from '@capacitor/preferences'

const BASE = 'https://tappynew.onrender.com'

const api = axios.create({ baseURL: BASE, timeout: 15000 })

api.interceptors.request.use(async (config) => {
  const { value: token } = await Preferences.get({ key: 'token' })
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(r => r, async (err) => {
  if (err.response?.status === 401) {
    await Preferences.remove({ key: 'token' })
    await Preferences.remove({ key: 'user' })
    window.location.reload()
  }
  return Promise.reject(err)
})

export default api
