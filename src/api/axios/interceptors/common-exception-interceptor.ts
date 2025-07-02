import { AXIOS } from '@/api'
import { CommonExceptionMap } from '@/api/error'
import { toast } from '@/components/toast'
import { isAxiosError } from 'axios'

export function setupCommonExceptionInterceptor() {
  AXIOS.interceptors.response.use(
    (response) => response,
    (error) => {
      if (!isAxiosError(error)) {
        return Promise.reject(error)
      }
      if (!error.response) {
        return Promise.reject(error)
      }

      const errorData = error.response.data as Record<string, unknown>
      if (typeof errorData.code !== 'string') {
        return Promise.reject(error)
      }

      if (errorData.code in CommonExceptionMap) {
        const exception = CommonExceptionMap[errorData.code]
        if (exception.message && exception.message.type) {
          toast[exception.message.type](exception.message.value)
        }
      }
      return Promise.reject(error)
    }
  )
}
