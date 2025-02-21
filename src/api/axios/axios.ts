import axios from 'axios'
import { setupAccessTokenInterceptor, setupRefreshTokenInterceptor } from './interceptors'

const BASE_URL = '/'

export const AXIOS = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

setupAccessTokenInterceptor()
setupRefreshTokenInterceptor()
