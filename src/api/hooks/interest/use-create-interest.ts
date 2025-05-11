import { fetches, endpoints } from '@/api'
import { errorCode } from '@/api/error'
import { apiMutate } from '@/api/hooks/api-mutate'
import { QueryCallback } from '@/api/hooks/error-handler'
import { CreateInterestRequest } from '@/api/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from '@/components/toast'

interface CreateInterestCallback extends QueryCallback {
  onInvalidParameter?: () => void
  onImageTooLarge?: () => void
}

export function useCreateInterest() {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ['POST', endpoints.interest.create],
    mutationFn: fetches.interest.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.interest.getList] })
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.interest.getGraph] })
    },
  })

  const createInterest = (body: CreateInterestRequest, callback?: CreateInterestCallback) => {
    apiMutate(
      mutate,
      { body },
      {
        onSuccess: () => {
          toast.success('관심사가 추가되었습니다.')
          callback?.onSuccess?.()
        },
        onError: () => {
          callback?.onError?.()
        },
        onCode: {
          [errorCode.interest.create.INVALID_PARAMETER]: () => {
            toast.warning('관심사 이름에 사용할 수 없는 단어가 사용되었습니다.')
            callback?.onInvalidParameter?.()
          },
          [errorCode.interest.create.IMAGE_TOO_LARGE]: () => {
            toast.warning('이미지 크기가 너무 큽니다.')
            callback?.onImageTooLarge?.()
          },
        },
        onElse: () => {
          toast.error('관심사 추가에 실패했습니다.')
          callback?.onElse?.()
        },
      }
    )
  }

  return { createInterest }
}
