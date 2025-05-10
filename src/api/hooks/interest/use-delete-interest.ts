import { fetches, endpoints } from '@/api'
import { apiMutate } from '@/api/hooks/api-mutate'
import { QueryCallback } from '@/api/hooks/error-handler'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from '@/components/toast'

export function useDeleteInterest() {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ['DELETE', endpoints.interest.delete],
    mutationFn: fetches.interest.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.interest.getList] })
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.interest.getGraph] })
    },
  })

  const deleteInterest = (id: string, callback?: QueryCallback) => {
    apiMutate(
      mutate,
      { id },
      {
        onSuccess: () => {
          toast.success('관심사가 삭제되었습니다.')
          callback?.onSuccess?.()
        },
        onError: () => {
          callback?.onError?.()
        },
        onElse: () => {
          toast.error('관심사 삭제에 실패했습니다.')
          callback?.onElse?.()
        },
      }
    )
  }

  return { deleteInterest }
}
