import { ApiError, ErrorCode } from '@/api/error'

interface ApiErrorHandlerListener {
  onError?: () => void
  onCode?: Partial<Record<ErrorCode, () => void>>
}

export function apiErrorHandler(error: Error, listener: ApiErrorHandlerListener) {
  if (!ApiError.isApiError(error)) {
    listener.onError?.()
    return
  }

  if (!listener.onCode) {
    listener.onError?.()
    return
  }

  for (const code in listener.onCode) {
    if (error.check(code as ErrorCode)) {
      listener.onCode[code as ErrorCode]?.()
      return
    }
  }
  listener.onError?.()
}
