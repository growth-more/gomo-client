import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { endpoints, fetches } from '@/api'
import { useMemo } from 'react'
import { AssignQuest, OrganizedAssignQuest } from '@/entities/quest'
import {
  CompleteAssignQuestRequest,
  CreateAssignQuestRequest,
  UpdateAssignQuestRequest,
} from '@/api/types'
import { errorCode } from '@/api/error'
import { apiErrorHandler, QueryCallback } from '@/api/hooks/error-handler'
import { toast } from '@/components/toast'

export function useAssignQuest() {
  const queryClient = useQueryClient()

  // Get Assign Quest

  const { data: assignQuest, isLoading } = useQuery({
    queryKey: ['GET', endpoints.quest.getAssignQuest],
    queryFn: fetches.quest.getAssignQuest,
  })

  const daily = useMemo<OrganizedAssignQuest>(() => {
    const quests = assignQuest?.dailyQuests ?? []
    return organizeAssignQuest(quests)
  }, [assignQuest])

  const weekly = useMemo<OrganizedAssignQuest>(() => {
    const quests = assignQuest?.weeklyQuests ?? []
    return organizeAssignQuest(quests)
  }, [assignQuest])

  const monthly = useMemo<OrganizedAssignQuest>(() => {
    const quests = assignQuest?.monthlyQuests ?? []
    return organizeAssignQuest(quests)
  }, [assignQuest])

  // Complete Quest

  const { mutate: completeQuestMutation } = useMutation({
    mutationKey: ['PUT', endpoints.quest.completeAssignQuest],
    mutationFn: fetches.quest.completeAssignQuest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.quest.getAssignQuest] }),
  })

  const completeQuest = (
    id: string,
    body: CompleteAssignQuestRequest,
    callback?: QueryCallback
  ) => {
    completeQuestMutation(
      { id, body },
      {
        onSuccess: () => {
          toast.success('퀘스트가 완료되었습니다.')
          callback?.onSuccess?.()
        },
        onError: (err) => {
          apiErrorHandler(err, {
            onError: () => {
              toast.error('퀘스트 완료에 실패했습니다.')
              callback?.onError?.()
            },
          })
        },
      }
    )
  }

  // Confirm Quest

  const { mutate: confirmQuestMutation } = useMutation({
    mutationKey: ['PUT', endpoints.quest.confirmAssignQuest],
    mutationFn: fetches.quest.confirmAssignQuest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.quest.getAssignQuest] }),
  })

  const confirmQuest = (id: string, callback?: QueryCallback) => {
    confirmQuestMutation(
      { id },
      {
        onSuccess: () => {
          toast.success('퀘스트가 수락되었습니다.')
          callback?.onSuccess?.()
        },
        onError: (err) => {
          apiErrorHandler(err, {
            onError: () => {
              toast.error('퀘스트 수락에 실패했습니다.')
              callback?.onError?.()
            },
          })
        },
      }
    )
  }

  // Delete Quest

  const { mutate: deleteQuestMutation } = useMutation({
    mutationKey: ['DELETE', endpoints.quest.deleteAssignQuest],
    mutationFn: fetches.quest.deleteAssignQuest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.quest.getAssignQuest] }),
  })

  const deleteQuest = (id: string, callback?: QueryCallback) => {
    deleteQuestMutation(
      { id },
      {
        onSuccess: () => {
          toast.success('퀘스트가 삭제되었습니다.')
          callback?.onSuccess?.()
        },
        onError: (err) => {
          apiErrorHandler(err, {
            onError: () => {
              toast.error('퀘스트 삭제에 실패했습니다.')
              callback?.onError?.()
            },
          })
        },
      }
    )
  }

  // Create Quest

  const { mutate: createQuestMutation } = useMutation({
    mutationKey: ['POST', endpoints.quest.createAssignQuest],
    mutationFn: fetches.quest.createAssignQuest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.quest.getAssignQuest] }),
  })

  interface CreateQuestCallback extends QueryCallback {
    onThresholdExceeded?: () => void
    onInvalidParameter?: () => void
  }

  const createQuest = (body: CreateAssignQuestRequest, callback?: CreateQuestCallback) => {
    createQuestMutation(
      { body },
      {
        onSuccess: () => {
          toast.success('퀘스트가 추가되었습니다.')
          callback?.onSuccess?.()
        },
        onError: (err) => {
          apiErrorHandler(err, {
            onError: () => {
              toast.error('퀘스트 생성에 실패했습니다.')
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
          })
        },
      }
    )
  }

  // Update Quest

  const { mutate: updateQuestMutation } = useMutation({
    mutationKey: ['PUT', endpoints.quest.updateAssignQuest],
    mutationFn: fetches.quest.updateAssignQuest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.quest.getAssignQuest] }),
  })

  interface UpdateQuestCallback extends QueryCallback {
    onInvalidParameter?: () => void
  }

  const updateQuest = (
    id: string,
    body: UpdateAssignQuestRequest,
    callback?: UpdateQuestCallback
  ) => {
    updateQuestMutation(
      { id, body },
      {
        onSuccess: () => {
          toast.success('퀘스트가 수정되었습니다.')
          callback?.onSuccess?.()
        },
        onError: (err) => {
          apiErrorHandler(err, {
            onError: () => {
              toast.error('퀘스트 수정에 실패했습니다.')
              callback?.onError?.()
            },
            onCode: {
              [errorCode.quest.update.INVALID_PARAMETER]: () => {
                toast.warning('퀘스트 이름에 사용할 수 없는 단어가 사용되었습니다.')
                callback?.onInvalidParameter?.()
              },
            },
          })
        },
      }
    )
  }

  // Reorder Quest

  const { mutate: reorderQuest } = useMutation({
    mutationKey: ['PUT', endpoints.quest.updateAssignQuestOrder],
    mutationFn: fetches.quest.updateAssignQuestOrder,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.quest.getAssignQuest] }),
  })

  return {
    daily,
    weekly,
    monthly,
    isLoading,
    completeQuest,
    confirmQuest,
    deleteQuest,
    createQuest,
    updateQuest,
    reorderQuest,
  }
}

function organizeAssignQuest(quests: AssignQuest[]) {
  const completed: AssignQuest[] = []
  const confirmed: AssignQuest[] = []
  const unconfirmed: AssignQuest[] = []

  quests.forEach((quest) => {
    if (quest.completed) {
      completed.push(quest)
    } else if (quest.confirmed) {
      confirmed.push(quest)
    } else {
      unconfirmed.push(quest)
    }
  })

  completed.sort((a, b) => a.displayOrder - b.displayOrder)
  confirmed.sort((a, b) => a.displayOrder - b.displayOrder)
  unconfirmed.sort((a, b) => a.displayOrder - b.displayOrder)

  return { completed, confirmed, unconfirmed }
}
