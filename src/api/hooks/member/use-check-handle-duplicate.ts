import { endpoints, fetches } from '@/api'
import { errorCode } from '@/api/error'
import { apiMutate } from '@/api/hooks/api-mutate'
import { QueryCallback } from '@/api/hooks/error-handler'
import { toast } from '@/components/toast'
import { useMutation } from '@tanstack/react-query'

interface CheckHandleDuplicateCallback extends QueryCallback {
  onInvalidParameter?: () => void
}

export function useCheckHandleDuplicate() {
  const { mutate } = useMutation({
    mutationKey: ['GET', endpoints.member.checkHandleDuplicate],
    mutationFn: fetches.member.checkHandleDuplicate,
  })

  const checkHandleDuplicate = (handle: string, callback?: CheckHandleDuplicateCallback) => {
    apiMutate(
      mutate,
      { handle },
      {
        onSuccess: () => {
          callback?.onSuccess?.()
        },
        onError: () => {
          callback?.onError?.()
        },
        onCode: {
          [errorCode.profile.handle.INVALID_PARAMETER]: () => {
            toast.error('핸들 형식이 올바르지 않습니다.')
            callback?.onInvalidParameter?.()
          },
        },
        onElse: () => {
          toast.error('핸들 중복 체크에 실패했습니다.')
          callback?.onElse?.()
        },
      }
    )
  }

  return { checkHandleDuplicate }
}
