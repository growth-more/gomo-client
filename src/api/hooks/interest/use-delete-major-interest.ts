import { endpoints, fetches } from '@/api'
import { apiMutate } from '@/api/hooks/api-mutate'
import { QueryCallback } from '@/api/hooks/error-handler'
import { toast } from '@/components/toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useDeleteMajorInterest() {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ['DELETE', endpoints.interest.deleteMajorInterest],
    mutationFn: fetches.interest.deleteMajorInterest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['INTEREST'],
      })
    },
  })

  const deleteMajorInterest = (id: string, callback?: QueryCallback) => {
    apiMutate(
      mutate,
      { id },
      {
        onSuccess: () => {
          toast.success('주요 관심사에서 해제되었습니다.')
          callback?.onSuccess?.()
        },
        onError: () => {
          callback?.onError?.()
        },
        onElse: () => {
          toast.error('주요 관심사 해제에 실패했습니다.')
          callback?.onElse?.()
        },
      }
    )
  }

  return { deleteMajorInterest }
}
