import { isAxiosError } from 'axios'
import { AXIOS } from '@/api'
import { fetches } from '@/api/fetches'
import { useTokenStore } from '@/stores'
import { endpoints } from '@/api/endpoints'

interface FailedQueue {
  resolve: (token: string) => void
  reject: (reason?: unknown) => void
}

let isRefreshing = false
let failedQueue: FailedQueue[] = []

export function setupRefreshTokenInterceptor() {
  AXIOS.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (!isAxiosError(error)) {
        return Promise.reject(error)
      }
      if (!error.response) {
        return Promise.reject(error)
      }
      if (!error.config) {
        return Promise.reject(error)
      }
      if (error.response.status !== 401) {
        return Promise.reject(error)
      }

      const originalRequest = error.config

      // 엑세스 토큰 재발급에 실패한 경우
      if (originalRequest.url === endpoints.auth.reissue) {
        return Promise.reject(error)
      }

      // 이미 재발급이 진행중인 경우
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return AXIOS(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }

      // 첫 재발급 시도
      isRefreshing = true

      try {
        const { token } = await fetches.auth.reissue()

        useTokenStore.getState().setAccessToken(token)
        originalRequest.headers.Authorization = `Bearer ${token}`

        failedQueue.forEach((failed) => failed.resolve(token))
        failedQueue = []

        return await AXIOS(originalRequest)
      } catch (err) {
        failedQueue.forEach((failed) => failed.reject(err))
        failedQueue = []
        useTokenStore.getState().clearAccessToken()
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }
  )
}
