import { endpoints } from '@/api/endpoints'
import { fetches } from '@/api/fetches'
import { OrganizedRepeatQuest } from '@/entities'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useRepeatQuest() {
  const queryClient = useQueryClient()

  const { data: repeatQuestData, isLoading } = useQuery({
    queryKey: ['GET', endpoints.quest.getRepeatQuest],
    queryFn: fetches.quest.getRepeatQuest,
  })

  const { mutate: createRepeatQuest } = useMutation({
    mutationKey: ['POST', endpoints.quest.createRepeatQuest],
    mutationFn: fetches.quest.createRepeatQuest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.quest.getRepeatQuest] }),
  })

  const { mutate: updateRepeatQuest } = useMutation({
    mutationKey: ['PUT', endpoints.quest.updateRepeatQuest],
    mutationFn: fetches.quest.updateRepeatQuest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.quest.getRepeatQuest] }),
  })

  const { mutate: deleteRepeatQuest } = useMutation({
    mutationKey: ['DELETE', endpoints.quest.deleteRepeatQuest],
    mutationFn: fetches.quest.deleteRepeatQuest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.quest.getRepeatQuest] }),
  })

  const { mutate: reorderRepeatQuest } = useMutation({
    mutationKey: ['PUT', endpoints.quest.updateRepeatQuestOrder],
    mutationFn: fetches.quest.updateRepeatQuestOrder,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.quest.getRepeatQuest] }),
  })

  const repeatQuest = useMemo<OrganizedRepeatQuest>(() => {
    const daily = repeatQuestData?.dailyQuests ?? []
    const weekly = repeatQuestData?.weeklyQuests ?? []
    const monthly = repeatQuestData?.monthlyQuests ?? []

    return { daily, weekly, monthly }
  }, [repeatQuestData])

  return {
    repeatQuest,
    isLoading,
    createRepeatQuest,
    updateRepeatQuest,
    deleteRepeatQuest,
    reorderRepeatQuest,
  }
}
