import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { endpoints, fetches } from '@/api'
import { useMemo } from 'react'
import { AssignQuest, OrganizedAssignQuest } from '@/entities'
import { CreateAssignQuestRequest } from '@/api/types'
import { ApiError, errorCode } from '@/api/error'

interface CreateQuestCallback {
  onSuccess?: () => void
  onThresholdExceeded?: () => void
  onInvalidParameter?: () => void
  onError?: () => void
}

export function useAssignQuest() {
  const queryClient = useQueryClient()

  const { data: assignQuest, isLoading } = useQuery({
    queryKey: ['GET', endpoints.quest.getAssignQuest],
    queryFn: fetches.quest.getAssignQuest,
  })

  const { mutate: completeQuest } = useMutation({
    mutationKey: ['PUT', endpoints.quest.completeAssignQuest],
    mutationFn: fetches.quest.completeAssignQuest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.quest.getAssignQuest] }),
  })

  const { mutate: confirmQuest } = useMutation({
    mutationKey: ['PUT', endpoints.quest.confirmAssignQuest],
    mutationFn: fetches.quest.confirmAssignQuest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.quest.getAssignQuest] }),
  })

  const { mutate: deleteQuest } = useMutation({
    mutationKey: ['DELETE', endpoints.quest.deleteAssignQuest],
    mutationFn: fetches.quest.deleteAssignQuest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.quest.getAssignQuest] }),
  })

  const { mutate: createQuestMutation } = useMutation({
    mutationKey: ['POST', endpoints.quest.createAssignQuest],
    mutationFn: fetches.quest.createAssignQuest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.quest.getAssignQuest] }),
  })

  const { mutate: updateQuest } = useMutation({
    mutationKey: ['PUT', endpoints.quest.updateAssignQuest],
    mutationFn: fetches.quest.updateAssignQuest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.quest.getAssignQuest] }),
  })

  const { mutate: reorderQuest } = useMutation({
    mutationKey: ['PUT', endpoints.quest.updateAssignQuestOrder],
    mutationFn: fetches.quest.updateAssignQuestOrder,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.quest.getAssignQuest] }),
  })

  const createQuest = (body: CreateAssignQuestRequest, callback: CreateQuestCallback) => {
    createQuestMutation(
      { body },
      {
        onSuccess: () => {
          callback.onSuccess?.()
        },
        onError: (error) => {
          if (!ApiError.isApiError(error)) {
            callback.onError?.()
            return
          }
          if (error.name === errorCode.quest.create.THRESHOLD_EXCEEDED) {
            callback.onThresholdExceeded?.()
            return
          }
          if (error.name === errorCode.quest.create.INVALID_PARAMETER) {
            callback.onInvalidParameter?.()
            return
          }
          callback.onError?.()
        },
      }
    )
  }

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
