import { create } from 'zustand'
import { persist, subscribeWithSelector } from 'zustand/middleware'

const STORAGE_KEY = 'jwt_access_token'

interface TokenState {
  accessToken: string | null
  setAccessToken: (accessToken: string) => void
  clearAccessToken: () => void
}

export const useTokenStore = create<TokenState>()(
  subscribeWithSelector(
    persist(
      (set) => ({
        accessToken: null,
        setAccessToken: (accessToken) => set({ accessToken }),
        clearAccessToken: () => set({ accessToken: null }),
      }),
      {
        name: STORAGE_KEY,
      }
    )
  )
)
