import { endpoints, fetches } from '@/api'
import { apiMutate } from '@/api/hooks/api-mutate'
import { QueryCallback } from '@/api/hooks/error-handler'
import { CompleteAssignQuestRequest } from '@/api/types'
import { toast } from '@/components/toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCompleteAssignQuest() {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ['PUT', endpoints.quest.completeAssignQuest],
    mutationFn: fetches.quest.completeAssignQuest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.quest.getAssignQuest] })
    },
  })

  const completeAssignQuest = (
    id: string,
    body: CompleteAssignQuestRequest,
    callback?: QueryCallback
  ) => {
    apiMutate(
      mutate,
      { id, body },
      {
        onSuccess: () => {
          toast.success('퀘스트가 완료되었습니다.')
          callback?.onSuccess?.()
        },
        onError: () => {
          callback?.onError?.()
        },
        onElse: () => {
          toast.error('퀘스트 완료에 실패했습니다.')
          callback?.onElse?.()
        },
      }
    )
  }

  return { completeAssignQuest }
}
