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

const ISO_DATETIME_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6}$/ // ISO 8601 (Spring LocalDateTime)

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
          if (typeof value === 'string' && ISO_DATETIME_REGEX.test(value)) {
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
