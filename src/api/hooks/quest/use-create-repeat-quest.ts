import { endpoints, fetches } from '@/api'
import { errorCode } from '@/api/error'
import { apiMutate } from '@/api/hooks/api-mutate'
import { QueryCallback } from '@/api/hooks/error-handler'
import { CreateRepeatQuestRequest } from '@/api/types'
import { toast } from '@/components/toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface CreateRepeatQuestCallback extends QueryCallback {
  onThresholdExceeded?: () => void
  onInvalidParameter?: () => void
}

export function useCreateRepeatQuest() {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ['POST', endpoints.quest.createRepeatQuest],
    mutationFn: fetches.quest.createRepeatQuest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.quest.getRepeatQuest] })
    },
  })

  const createRepeatQuest = (
    body: CreateRepeatQuestRequest,
    callback?: CreateRepeatQuestCallback
  ) => {
    apiMutate(
      mutate,
      { body },
      {
        onSuccess: () => {
          toast.success('반복퀘스트가 추가되었습니다.')
          callback?.onSuccess?.()
        },
        onError: () => {
          callback?.onError?.()
        },
        onCode: {
          [errorCode.quest.repeat.create.THRESHOLD_EXCEEDED]: () => {
            toast.warning('반복퀘스트 생성 횟수가 초과되었습니다.')
            callback?.onThresholdExceeded?.()
          },
          [errorCode.quest.repeat.create.INVALID_PARAMETER]: () => {
            toast.warning('반복퀘스트 이름에 사용할 수 없는 단어가 사용되었습니다.')
            callback?.onInvalidParameter?.()
          },
        },
        onElse: () => {
          toast.error('반복퀘스트 추가에 실패했습니다.')
          callback?.onElse?.()
        },
      }
    )
  }

  return { createRepeatQuest }
}
