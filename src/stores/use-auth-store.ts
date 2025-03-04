import { Auth } from '@/auth/types'
import { create } from 'zustand'

interface AuthState {
  auth: Auth | null
  isLoading: boolean
  setAuth: (auth: Auth) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()((set) => ({
  auth: null,
  isLoading: true,
  setAuth: (auth) => set({ auth, isLoading: false }),
  clearAuth: () => set({ auth: null, isLoading: false }),
}))

// 기존 subscribe 방식 main-layout useEffect 방식으로 변경
// useTokenStore.subscribe(
//   (state) => state.accessToken,
//   (token) => {
//     if (token !== null) {
//       const { sub: id } = jwtDecode<AccessToken>(token)
//       useAuthStore.getState().setAuth({ id })
//     }
//     if (token === null) {
//       useAuthStore.getState().clearAuth()
//     }
//   }
// )
