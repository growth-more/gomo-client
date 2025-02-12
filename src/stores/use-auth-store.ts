import { AccessToken, Auth } from '@/auth/types'
import { create } from 'zustand'
import { useTokenStore } from './use-token-store'
import { jwtDecode } from 'jwt-decode'

interface AuthState {
  auth: Auth | null
  setAuth: (auth: Auth) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()((set) => ({
  auth: null,
  setAuth: (auth) => set({ auth }),
  clearAuth: () => set({ auth: null }),
}))

useTokenStore.subscribe(
  (state) => state.accessToken,
  (token) => {
    if (token !== null) {
      const { id } = jwtDecode<AccessToken>(token)
      useAuthStore.getState().setAuth({ id })
    }
    if (token === null) {
      useAuthStore.getState().clearAuth()
    }
  }
)
