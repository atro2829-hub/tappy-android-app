import { Preferences } from '@capacitor/preferences'

export async function setCache(key: string, data: unknown) {
  await Preferences.set({ key: `cache_${key}`, value: JSON.stringify(data) })
}

export async function getCache<T>(key: string): Promise<T | null> {
  const { value } = await Preferences.get({ key: `cache_${key}` })
  if (!value) return null
  try { return JSON.parse(value) as T } catch { return null }
}

export async function setItem(key: string, value: string) {
  await Preferences.set({ key, value })
}

export async function getItem(key: string): Promise<string | null> {
  const { value } = await Preferences.get({ key })
  return value
}
