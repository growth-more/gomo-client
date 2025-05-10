import { fetches, endpoints } from '@/api'
import { apiMutate } from '@/api/hooks/api-mutate'
import { QueryCallback } from '@/api/hooks/error-handler'
import { toast } from '@/components/toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useDeleteInterestEdge() {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ['DELETE', endpoints.interest.deleteEdge],
    mutationFn: fetches.interest.deleteEdge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.interest.getGraph] })
    },
  })

  const deleteEdge = (id: string, callback?: QueryCallback) => {
    apiMutate(
      mutate,
      { id },
      {
        onSuccess: () => {
          toast.success('관심사 연결이 삭제되었습니다.')
          callback?.onSuccess?.()
        },
        onError: () => {
          callback?.onError?.()
        },
        onElse: () => {
          toast.error('관심사 연결 삭제에 실패했습니다.')
          callback?.onElse?.()
        },
      }
    )
  }

  return { deleteEdge }
}
