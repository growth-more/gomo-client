import { useTokenStore } from '@/stores'
import { AXIOS } from '@/api'

let accessTokenInterceptor: number | null = null

function initializeInterceptor() {
  if (accessTokenInterceptor !== null) {
    AXIOS.interceptors.request.eject(accessTokenInterceptor)
    accessTokenInterceptor = null
  }
}

function setupInterceptor(token: string) {
  accessTokenInterceptor = AXIOS.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`
    return config
  })
}

export function setupAccessTokenInterceptor() {
  const initialToken = useTokenStore.getState().accessToken
  if (initialToken !== null) {
    setupInterceptor(initialToken)
  }

  useTokenStore.subscribe(
    (state) => state.accessToken,
    (token) => {
      initializeInterceptor()
      if (token !== null) {
        setupInterceptor(token)
      }
    }
  )
}
