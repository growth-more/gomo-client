import { fetches, endpoints } from '@/api'
import { errorCode } from '@/api/error'
import { apiMutate } from '@/api/hooks/api-mutate'
import { QueryCallback } from '@/api/hooks/error-handler'
import { UpdateInterestLogoRequest } from '@/api/types'
import { toast } from '@/components/toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface UpdateInterestLogoCallback extends QueryCallback {
  onImageTooLarge?: () => void
}

export function useUpdateInterestLogo() {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ['PUT', endpoints.interest.updateLogo],
    mutationFn: fetches.interest.updateLogo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.interest.getList] })
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.interest.getGraph] })
    },
  })

  const updateInterestLogo = (
    id: string,
    body: UpdateInterestLogoRequest,
    callback?: UpdateInterestLogoCallback
  ) => {
    apiMutate(
      mutate,
      { id, body },
      {
        onSuccess: () => {
          toast.success('관심사 로고가 수정되었습니다.')
          callback?.onSuccess?.()
        },
        onError: () => {
          callback?.onError?.()
        },
        onCode: {
          [errorCode.interest.update.IMAGE_TOO_LARGE]: () => {
            toast.warning('이미지 크기가 너무 큽니다.')
            callback?.onImageTooLarge?.()
          },
        },
        onElse: () => {
          toast.error('관심사 로고 수정에 실패했습니다.')
          callback?.onElse?.()
        },
      }
    )
  }

  return { updateInterestLogo }
}
