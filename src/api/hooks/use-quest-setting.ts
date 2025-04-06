import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { endpoints, fetches } from '@/api'
import { QuestProperty } from '@/entities'
import { useMemo } from 'react'
import { UpdateQuestPropertyRequest } from '@/api/types'
import { QueryCallback, apiErrorHandler } from '@/api/hooks/error-handler'
import { toast } from '@/components/toast'
import { errorCode } from '@/api/error'

export function useQuestSetting() {
  const queryClient = useQueryClient()

  // Get Quest Property

  const { data, isLoading } = useQuery({
    queryKey: ['GET', endpoints.member.getQuestProperty],
    queryFn: fetches.member.getQuestProperty,
  })

  const questProperty = useMemo<QuestProperty>(() => {
    if (!data) {
      return {
        dailyThreshold: 0,
        weeklyThreshold: 0,
        monthlyThreshold: 0,
      }
    }
    return data
  }, [data])

  // Update Quest Property

  const { mutate: updateQuestPropertyMutation } = useMutation({
    mutationKey: ['PUT', endpoints.member.updateQuestProperty],
    mutationFn: fetches.member.updateQuestProperty,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.member.getQuestProperty] }),
  })

  interface UpdateQuestPropertyCallback extends QueryCallback {
    onInvalidParameter?: () => void
  }

  const update = (body: UpdateQuestPropertyRequest, callback?: UpdateQuestPropertyCallback) => {
    updateQuestPropertyMutation(
      { body },
      {
        onSuccess: () => {
          toast.success('퀘스트 설정이 수정되었습니다.')
          callback?.onSuccess?.()
        },
        onError: (err) => {
          apiErrorHandler(err, {
            onError: () => {
              toast.error('퀘스트 설정 수정에 실패했습니다.')
              callback?.onError?.()
            },
            onCode: {
              [errorCode.quest.update.INVALID_PARAMETER]: () => {
                toast.warning('퀘스트 설정 수정에 실패했습니다.')
                callback?.onInvalidParameter?.()
              },
            },
          })
        },
      }
    )
  }

  return { questProperty, isLoading, update }
}
