import { endpoints, fetches } from '@/api'
import { errorCode } from '@/api/error'
import { apiMutate } from '@/api/hooks/api-mutate'
import { QueryCallback } from '@/api/hooks/error-handler'
import { UpdateRepeatQuestRequest } from '@/api/types'
import { toast } from '@/components/toast'
import { useQueryClient } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

interface UpdateRepeatQuestCallback extends QueryCallback {
  onInvalidParameter?: () => void
}

export function useUpdateRepeatQuest() {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ['PUT', endpoints.quest.updateRepeatQuest],
    mutationFn: fetches.quest.updateRepeatQuest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.quest.getRepeatQuest] })
    },
  })

  const updateRepeatQuest = (
    id: string,
    body: UpdateRepeatQuestRequest,
    callback?: UpdateRepeatQuestCallback
  ) => {
    apiMutate(
      mutate,
      { id, body },
      {
        onSuccess: () => {
          toast.success('반복퀘스트가 수정되었습니다.')
          callback?.onSuccess?.()
        },
        onError: () => {
          callback?.onError?.()
        },
        onCode: {
          [errorCode.quest.repeat.update.INVALID_PARAMETER]: () => {
            toast.warning('반복퀘스트 이름에 사용할 수 없는 단어가 사용되었습니다.')
            callback?.onInvalidParameter?.()
          },
        },
        onElse: () => {
          toast.error('반복퀘스트 수정에 실패했습니다.')
          callback?.onElse?.()
        },
      }
    )
  }

  return { updateRepeatQuest }
}
