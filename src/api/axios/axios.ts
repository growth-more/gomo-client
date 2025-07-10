import axios from 'axios'
import {
  setupAccessTokenInterceptor,
  setupCommonExceptionInterceptor,
  setupRefreshTokenInterceptor,
} from './interceptors'
import { cloneDeepWith } from 'lodash'
import dayjs from 'dayjs'

const BASE_URL = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL
  : import.meta.env.VITE_ENABLE_MOCK_API.toLowerCase() === 'false'
  ? '/api/'
  : '/'

export const AXIOS = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  transformResponse: [
    (data) => {
      if (typeof data !== 'string' || !data) {
        return data
      }
      try {
        const parsed = JSON.parse(data)
        return cloneDeepWith(parsed, (value) => {
          if (typeof value === 'string') {
            const date = dayjs(value)
            if (date.isValid()) {
              return date.toDate()
            }
          }
          return undefined
        })
      } catch {
        return data
      }
    },
  ],
})

setupCommonExceptionInterceptor()
setupAccessTokenInterceptor()
setupRefreshTokenInterceptor()
