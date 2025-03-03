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
        console.log('리프레시 토큰 사용하여 재발급 시도')
        const { accessToken } = await fetches.auth.reissue()
        useTokenStore.getState().setAccessToken(accessToken)

        if (error.config) {
          // 기본적으로 `useTokenStore`에 새로운 엑세스 토큰을 저장하면, `accessTokenInterceptor`가 자동으로 새로운 헤더를 추가함
          // 따라서 아래의 코드는 불필요할 수 있지만, subscribe가 비동기로 동작하므로 아래의 코드를 명시적으로 작성함
          console.log('엑세스 토큰 재발급 후 헤더 추가 + 요청 재시도')
          error.config.headers.Authorization = `Bearer ${accessToken}`
          return AXIOS(error.config)
        }
      }
      console.log('엑세스 토큰 재발급 실패')
      throw error
    }
  )
}
