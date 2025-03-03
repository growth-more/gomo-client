import { create } from 'zustand'
import { persist, subscribeWithSelector } from 'zustand/middleware'

const STORAGE_KEY = 'jwt_access_token'

interface TokenState {
  isHydrated: boolean
  accessToken: string | null
  setAccessToken: (accessToken: string) => void
  clearAccessToken: () => void
  setIsHydrated: () => void
}

export const useTokenStore = create<TokenState>()(
  subscribeWithSelector(
    persist(
      (set) => ({
        isHydrated: false,
        accessToken: null,
        setAccessToken: (accessToken) => set({ accessToken }),
        clearAccessToken: () => set({ accessToken: null }),
        setIsHydrated: () => set({ isHydrated: true }),
      }),
      {
        name: STORAGE_KEY,
        onRehydrateStorage: () => (state) => {
          if (state) {
            state.setIsHydrated()
          }
        },
      }
    )
  )
)
