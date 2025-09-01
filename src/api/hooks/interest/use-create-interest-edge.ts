import { fetches, endpoints } from '@/api'
import { apiMutate } from '@/api/hooks/api-mutate'
import { QueryCallback } from '@/api/hooks/error-handler'
import { CreateInterestEdgeRequest } from '@/api/types'
import { toast } from '@/components/toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateInterestEdge() {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ['POST', endpoints.interest.createEdge],
    mutationFn: fetches.interest.createEdge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['INTEREST'] })
    },
  })

  const createEdge = (body: CreateInterestEdgeRequest, callback?: QueryCallback) => {
    apiMutate(
      mutate,
      { body },
      {
        onSuccess: () => {
          toast.success('관심사 연결이 추가되었습니다.')
          callback?.onSuccess?.()
        },
        onError: () => {
          callback?.onError?.()
        },
        onElse: () => {
          toast.error('관심사 연결에 실패했습니다.')
          callback?.onElse?.()
        },
      }
    )
  }

  return { createEdge }
}
