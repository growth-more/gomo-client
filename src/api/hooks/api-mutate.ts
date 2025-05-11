import { ErrorCode } from '@/api/error'
import { apiErrorHandler } from '@/api/hooks/error-handler'
import { UseMutateFunction } from '@tanstack/react-query'

interface ApiMutateOptions<T> {
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
  onElse?: (error: Error) => void
  onCode?: Partial<Record<ErrorCode, (error: Error) => void>>
}

export function apiMutate<Response, Request>(
  mutate: UseMutateFunction<Response, Error, Request>,
  request: Request,
  options?: ApiMutateOptions<Response>
) {
  mutate(request, {
    onSuccess: (data) => options?.onSuccess?.(data),
    onError: (err) => {
      options?.onError?.(err)
      apiErrorHandler(err, {
        onCode: options?.onCode,
        onElse: options?.onElse,
      })
    },
  })
}
