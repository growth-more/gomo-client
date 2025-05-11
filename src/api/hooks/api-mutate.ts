import { ErrorCode } from '@/api/error'
import { apiErrorHandler } from '@/api/hooks/error-handler'
import { UseMutateFunction } from '@tanstack/react-query'

interface ApiMutateOptions {
  onSuccess?: () => void
  onError?: (error: Error) => void
  onElse?: (error: Error) => void
  onCode?: Partial<Record<ErrorCode, (error: Error) => void>>
}

export function apiMutate<Response, Request>(
  mutate: UseMutateFunction<Response, Error, Request>,
  request: Request,
  options?: ApiMutateOptions
) {
  mutate(request, {
    onSuccess: options?.onSuccess,
    onError: (err) => {
      options?.onError?.(err)
      apiErrorHandler(err, {
        onCode: options?.onCode,
        onElse: options?.onElse,
      })
    },
  })
}
