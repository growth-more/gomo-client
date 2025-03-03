import axios from 'axios'
import { setupAccessTokenInterceptor, setupRefreshTokenInterceptor } from './interceptors'

const BASE_URL =
  import.meta.env.PROD || import.meta.env.VITE_ENABLE_MOCK_API.toLowerCase() === 'false'
    ? 'https://gomo.nurdykim.me/api/'
    : '/'

export const AXIOS = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

setupAccessTokenInterceptor()
setupRefreshTokenInterceptor()
