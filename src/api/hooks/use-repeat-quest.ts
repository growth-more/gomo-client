import { endpoints } from '@/api/endpoints'
import { errorCode } from '@/api/error'
import { fetches } from '@/api/fetches'
import { apiErrorHandler, QueryCallback } from '@/api/hooks/error-handler'
import { CreateRepeatQuestRequest, UpdateRepeatQuestRequest } from '@/api/types'
import { toast } from '@/components/toast'
import { OrganizedRepeatQuest } from '@/entities/quest'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useRepeatQuest() {
  const queryClient = useQueryClient()

  // Get Repeat Quest

  const { data: repeatQuestData, isLoading } = useQuery({
    queryKey: ['GET', endpoints.quest.getRepeatQuest],
    queryFn: fetches.quest.getRepeatQuest,
  })

  const repeatQuest = useMemo<OrganizedRepeatQuest>(() => {
    const daily = repeatQuestData?.dailyQuests ?? []
    const weekly = repeatQuestData?.weeklyQuests ?? []
    const monthly = repeatQuestData?.monthlyQuests ?? []

    return { daily, weekly, monthly }
  }, [repeatQuestData])

  // Create Repeat Quest

  const { mutate: createRepeatQuestMutation } = useMutation({
    mutationKey: ['POST', endpoints.quest.createRepeatQuest],
    mutationFn: fetches.quest.createRepeatQuest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.quest.getRepeatQuest] }),
  })

  interface CreateRepeatQuestCallback extends QueryCallback {
    onThresholdExceeded?: () => void
    onInvalidParameter?: () => void
  }

  const createRepeatQuest = (
    body: CreateRepeatQuestRequest,
    callback?: CreateRepeatQuestCallback
  ) => {
    createRepeatQuestMutation(
      { body },
      {
        onSuccess: () => {
          toast.success('반복퀘스트가 추가되었습니다.')
          callback?.onSuccess?.()
        },
        onError: (err) => {
          apiErrorHandler(err, {
            onError: () => {
              toast.error('반복퀘스트 추가에 실패했습니다.')
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
          })
        },
      }
    )
  }

  // Update Repeat Quest

  const { mutate: updateRepeatQuestMutation } = useMutation({
    mutationKey: ['PUT', endpoints.quest.updateRepeatQuest],
    mutationFn: fetches.quest.updateRepeatQuest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.quest.getRepeatQuest] }),
  })

  interface UpdateRepeatQuestCallback extends QueryCallback {
    onInvalidParameter?: () => void
  }

  const updateRepeatQuest = (
    id: string,
    body: UpdateRepeatQuestRequest,
    callback?: UpdateRepeatQuestCallback
  ) => {
    updateRepeatQuestMutation(
      { id, body },
      {
        onSuccess: () => {
          toast.success('반복퀘스트가 수정되었습니다.')
          callback?.onSuccess?.()
        },
        onError: (err) => {
          apiErrorHandler(err, {
            onError: () => {
              toast.error('반복퀘스트 수정에 실패했습니다.')
              callback?.onError?.()
            },
            onCode: {
              [errorCode.quest.repeat.update.INVALID_PARAMETER]: () => {
                toast.warning('반복퀘스트 이름에 사용할 수 없는 단어가 사용되었습니다.')
                callback?.onInvalidParameter?.()
              },
            },
          })
        },
      }
    )
  }

  // Delete Repeat Quest

  const { mutate: deleteRepeatQuestMutation } = useMutation({
    mutationKey: ['DELETE', endpoints.quest.deleteRepeatQuest],
    mutationFn: fetches.quest.deleteRepeatQuest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.quest.getRepeatQuest] }),
  })

  const deleteRepeatQuest = (id: string, callback?: QueryCallback) => {
    deleteRepeatQuestMutation(
      { id },
      {
        onSuccess: () => {
          toast.success('반복퀘스트가 삭제되었습니다.')
          callback?.onSuccess?.()
        },
        onError: (err) => {
          apiErrorHandler(err, {
            onError: () => {
              toast.error('반복퀘스트 삭제에 실패했습니다.')
              callback?.onError?.()
            },
          })
        },
      }
    )
  }

  // Reorder Repeat Quest

  const { mutate: reorderRepeatQuest } = useMutation({
    mutationKey: ['PUT', endpoints.quest.updateRepeatQuestOrder],
    mutationFn: fetches.quest.updateRepeatQuestOrder,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.quest.getRepeatQuest] }),
  })

  return {
    repeatQuest,
    isLoading,
    createRepeatQuest,
    updateRepeatQuest,
    deleteRepeatQuest,
    reorderRepeatQuest,
  }
}
