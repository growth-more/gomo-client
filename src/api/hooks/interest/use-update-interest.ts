import { endpoints, fetches } from '@/api'
import { errorCode } from '@/api/error'
import { apiMutate } from '@/api/hooks'
import { QueryCallback } from '@/api/hooks/error-handler'
import { UpdateInterestRequest } from '@/api/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from '@/components/toast'

interface UpdateInterestCallback extends QueryCallback {
  onInvalidParameter?: () => void
}

export function useUpdateInterest() {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ['PUT', endpoints.interest.update],
    mutationFn: fetches.interest.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.interest.getList] })
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.interest.getGraph] })
    },
  })

  const updateInterest = (
    id: string,
    body: UpdateInterestRequest,
    callback?: UpdateInterestCallback
  ) => {
    apiMutate(
      mutate,
      { id, body },
      {
        onSuccess: () => {
          toast.success('관심사가 수정되었습니다.')
          callback?.onSuccess?.()
        },
        onError: () => {
          callback?.onError?.()
        },
        onCode: {
          [errorCode.interest.update.INVALID_PARAMETER]: () => {
            toast.warning('관심사 이름에 사용할 수 없는 단어가 사용되었습니다.')
            callback?.onInvalidParameter?.()
          },
        },
        onElse: () => {
          toast.error('관심사 수정에 실패했습니다.')
          callback?.onElse?.()
        },
      }
    )
  }

  return { updateInterest }
}
