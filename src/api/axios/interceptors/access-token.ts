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
  /*
    최초 접속 시 useTokenStore가 hydrated 되지 않아 엑세스 토큰은 항상 null
    이후 hydrated 되면 엑세스 토큰이 변경되고, 이를 subscribe 하여 인터셉터를 설정
    따라서 아래의 최초 엑세스 토큰 설정 로직은 불필요함
    이후 문제 발생 시, 주석 해제 후 사용
  */

  // const initialToken = useTokenStore.getState().accessToken
  // if (initialToken !== null) {
  //   setupInterceptor(initialToken)
  // }

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
