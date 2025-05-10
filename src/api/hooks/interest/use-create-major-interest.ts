import { fetches, endpoints } from '@/api'
import { errorCode } from '@/api/error'
import { apiMutate } from '@/api/hooks/api-mutate'
import { QueryCallback } from '@/api/hooks/error-handler'
import { toast } from '@/components/toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface CreateMajorInterestCallback extends QueryCallback {
  onDuplicated?: () => void
}

export function useCreateMajorInterest() {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ['POST', endpoints.interest.createMajorInterest],
    mutationFn: fetches.interest.createMajorInterest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['GET', endpoints.interest.getMajorInterest],
      })
    },
  })

  const createMajorInterest = (id: string, callback?: CreateMajorInterestCallback) => {
    apiMutate(
      mutate,
      { id },
      {
        onSuccess: () => {
          toast.success('주요 관심사에 등록되었습니다.')
          callback?.onSuccess?.()
        },
        onError: () => {
          callback?.onError?.()
        },
        onCode: {
          [errorCode.interest.major.DUPLICATED]: () => {
            toast.warning('이미 등록된 주요 관심사입니다.')
            callback?.onDuplicated?.()
          },
        },
        onElse: () => {
          toast.error('주요 관심사 등록에 실패했습니다.')
          callback?.onElse?.()
        },
      }
    )
  }

  return { createMajorInterest }
}
