import { fetches, endpoints } from '@/api'
import { errorCode } from '@/api/error'
import { apiMutate } from '@/api/hooks/api-mutate'
import { QueryCallback } from '@/api/hooks/error-handler'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from '@/components/toast'
import { useCreateInterestEdge } from '@/api/hooks/interest/use-create-interest-edge'
import { CreateInterestResponse } from '@/api/types'

interface CreateInterestCallback extends QueryCallback {
  onInvalidParameter?: () => void
  onImageTooLarge?: () => void
}

interface CreateInterestParams {
  name: string
  colorCode: string
  logo?: File | null
  upperInterestId?: string
}

export function useCreateInterest() {
  const queryClient = useQueryClient()

  const { createEdge } = useCreateInterestEdge()

  const { mutate } = useMutation({
    mutationKey: ['POST', endpoints.interest.create],
    mutationFn: fetches.interest.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['INTEREST'] })
    },
  })

  const onSuccessHandler = (
    data: CreateInterestResponse,
    params: CreateInterestParams,
    callback?: CreateInterestCallback
  ) => {
    toast.success('관심사가 추가되었습니다.')
    if (!params.upperInterestId) {
      callback?.onSuccess?.()
      return
    }
    createEdge(
      {
        parentInterestId: params.upperInterestId,
        childInterestId: data.id,
      },
      { onSuccess: () => callback?.onSuccess?.() }
    )
  }

  const createInterest = (params: CreateInterestParams, callback?: CreateInterestCallback) => {
    const body = {
      name: params.name,
      colorCode: params.colorCode,
      logo: params.logo,
    }

    apiMutate(
      mutate,
      { body },
      {
        onSuccess: (data) => onSuccessHandler(data, params, callback),
        onError: () => callback?.onError?.(),
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
