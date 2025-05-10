import { fetches } from '@/api'
import { endpoints } from '@/api'
import { errorCode } from '@/api/error'
import { apiMutate } from '@/api/hooks/api-mutate'
import { QueryCallback } from '@/api/hooks/error-handler'
import { CreateAssignQuestRequest } from '@/api/types'
import { toast } from '@/components/toast'
import { useQueryClient } from '@tanstack/react-query'

import { useMutation } from '@tanstack/react-query'

interface CreateAssignQuestCallback extends QueryCallback {
  onThresholdExceeded?: () => void
  onInvalidParameter?: () => void
}

export function useCreateAssignQuest() {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ['POST', endpoints.quest.createAssignQuest],
    mutationFn: fetches.quest.createAssignQuest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.quest.getAssignQuest] })
    },
  })

  const createAssignQuest = (
    body: CreateAssignQuestRequest,
    callback?: CreateAssignQuestCallback
  ) => {
    apiMutate(
      mutate,
      { body },
      {
        onSuccess: () => {
          toast.success('퀘스트가 추가되었습니다.')
          callback?.onSuccess?.()
        },
        onError: () => {
          callback?.onError?.()
        },
        onCode: {
          [errorCode.quest.create.THRESHOLD_EXCEEDED]: () => {
            toast.warning('퀘스트 생성 횟수가 초과되었습니다.')
            callback?.onThresholdExceeded?.()
          },
          [errorCode.quest.create.INVALID_PARAMETER]: () => {
            toast.warning('퀘스트 이름에 사용할 수 없는 단어가 사용되었습니다.')
            callback?.onInvalidParameter?.()
          },
        },
        onElse: () => {
          toast.error('퀘스트 생성에 실패했습니다.')
          callback?.onElse?.()
        },
      }
    )
  }

  return { createAssignQuest }
}
