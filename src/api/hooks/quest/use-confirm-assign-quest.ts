import { endpoints, fetches } from '@/api'
import { apiMutate } from '@/api/hooks/api-mutate'
import { QueryCallback } from '@/api/hooks/error-handler'
import { toast } from '@/components/toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useConfirmAssignQuest() {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ['PUT', endpoints.quest.confirmAssignQuest],
    mutationFn: fetches.quest.confirmAssignQuest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.quest.getAssignQuest] })
    },
  })

  const confirmAssignQuest = (id: string, callback?: QueryCallback) => {
    apiMutate(
      mutate,
      { id },
      {
        onSuccess: () => {
          toast.success('퀘스트가 수락되었습니다.')
          callback?.onSuccess?.()
        },
        onError: () => {
          callback?.onError?.()
        },
        onElse: () => {
          toast.error('퀘스트 수락에 실패했습니다.')
          callback?.onElse?.()
        },
      }
    )
  }

  return { confirmAssignQuest }
}
