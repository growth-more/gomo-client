import axios from 'axios'
import { setupAccessTokenInterceptor, setupRefreshTokenInterceptor } from './interceptors'

const BASE_URL = import.meta.env.PROD
  ? 'https://gomo.nurdykim.me/api/'
  : import.meta.env.VITE_ENABLE_MOCK_API.toLowerCase() === 'false'
  ? '/api/'
  : '/'

export const AXIOS = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

setupAccessTokenInterceptor()
setupRefreshTokenInterceptor()
