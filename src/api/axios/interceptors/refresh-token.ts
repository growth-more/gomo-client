import { isAxiosError } from 'axios'
import { AXIOS } from '@/api'
import { fetches } from '@/api/fetches'
import { useTokenStore } from '@/stores'
import { endpoints } from '@/api/endpoints'

export function setupRefreshTokenInterceptor() {
  AXIOS.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (!isAxiosError(error)) {
        throw error
      }
      if (!error.response) {
        throw error
      }
      if (error.response.status === 401 && error.config?.url !== endpoints.auth.reissue) {
        const { accessToken } = await fetches.auth.reissue()
        useTokenStore.getState().setAccessToken(accessToken)

        if (error.config) {
          error.config.headers.Authorization = `Bearer ${accessToken}`
          return AXIOS(error.config)
        }
      }
      throw error
    }
  )
}
