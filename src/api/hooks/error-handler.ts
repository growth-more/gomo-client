import { ApiError, ErrorCode } from '@/api/error'

interface ApiErrorHandlerListener {
  onElse?: (error: Error) => void
  onCode?: Partial<Record<ErrorCode, (error: Error) => void>>
}

export function apiErrorHandler(error: Error, listener: ApiErrorHandlerListener) {
  if (!ApiError.isApiError(error)) {
    listener.onElse?.(error)
    return
  }

  if (!listener.onCode) {
    listener.onElse?.(error)
    return
  }

  for (const code in listener.onCode) {
    if (error.check(code as ErrorCode)) {
      listener.onCode[code as ErrorCode]?.(error)
      return
    }
  }
  listener.onElse?.(error)
}

interface QueryCallback<T = void> {
  onSuccess?: T extends void ? () => void : (data: T) => void
  onError?: () => void
  onElse?: () => void
}

export type { QueryCallback }
