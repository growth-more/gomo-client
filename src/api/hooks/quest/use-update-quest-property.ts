import { endpoints, fetches } from '@/api'
import { errorCode } from '@/api/error'
import { apiMutate } from '@/api/hooks/api-mutate'
import { QueryCallback } from '@/api/hooks/error-handler'
import { UpdateQuestPropertyRequest } from '@/api/types'
import { toast } from '@/components/toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface UpdateQuestPropertyCallback extends QueryCallback {
  onInvalidParameter?: () => void
}

export function useUpdateQuestProperty() {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ['PUT', endpoints.member.updateQuestProperty],
    mutationFn: fetches.member.updateQuestProperty,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.member.getQuestProperty] }),
  })

  const updateQuestProperty = (
    body: UpdateQuestPropertyRequest,
    callback?: UpdateQuestPropertyCallback
  ) => {
    apiMutate(
      mutate,
      { body },
      {
        onSuccess: () => {
          toast.success('퀘스트 설정이 수정되었습니다.')
          callback?.onSuccess?.()
        },
        onError: () => {
          callback?.onError?.()
        },
        onCode: {
          [errorCode.quest.update.INVALID_PARAMETER]: () => {
            toast.warning('퀘스트 설정 수정에 실패했습니다.')
            callback?.onInvalidParameter?.()
          },
        },
        onElse: () => {
          toast.error('퀘스트 설정 수정에 실패했습니다.')
          callback?.onElse?.()
        },
      }
    )
  }

  return { updateQuestProperty }
}
