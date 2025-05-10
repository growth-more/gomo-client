import { endpoints, fetches } from '@/api'
import { errorCode } from '@/api/error'
import { apiMutate } from '@/api/hooks/api-mutate'
import { QueryCallback } from '@/api/hooks/error-handler'
import { UpdateAssignQuestRequest } from '@/api/types'
import { toast } from '@/components/toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface UpdateAssignQuestCallback extends QueryCallback {
  onInvalidParameter?: () => void
}

export function useUpdateAssignQuest() {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ['PUT', endpoints.quest.updateAssignQuest],
    mutationFn: fetches.quest.updateAssignQuest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.quest.getAssignQuest] })
    },
  })

  const updateAssignQuest = (
    id: string,
    body: UpdateAssignQuestRequest,
    callback?: UpdateAssignQuestCallback
  ) => {
    apiMutate(
      mutate,
      { id, body },
      {
        onSuccess: () => {
          toast.success('퀘스트가 수정되었습니다.')
          callback?.onSuccess?.()
        },
        onError: () => {
          callback?.onError?.()
        },
        onCode: {
          [errorCode.quest.update.INVALID_PARAMETER]: () => {
            toast.warning('퀘스트 이름에 사용할 수 없는 단어가 사용되었습니다.')
            callback?.onInvalidParameter?.()
          },
        },
        onElse: () => {
          toast.error('퀘스트 수정에 실패했습니다.')
          callback?.onElse?.()
        },
      }
    )
  }

  return { updateAssignQuest }
}
