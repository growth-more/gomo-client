import { endpoints, fetches } from '@/api'
import { AssignQuest, OrganizedAssignQuest } from '@/entities/quest'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useGetAssignQuest() {
  const { data, isLoading } = useQuery({
    queryKey: ['GET', endpoints.quest.getAssignQuest],
    queryFn: fetches.quest.getAssignQuest,
  })

  const daily = useMemo<OrganizedAssignQuest>(() => {
    const quests = data?.dailyQuests ?? []
    return organizeAssignQuest(quests)
  }, [data])

  const weekly = useMemo<OrganizedAssignQuest>(() => {
    const quests = data?.weeklyQuests ?? []
    return organizeAssignQuest(quests)
  }, [data])

  const monthly = useMemo<OrganizedAssignQuest>(() => {
    const quests = data?.monthlyQuests ?? []
    return organizeAssignQuest(quests)
  }, [data])

  return { daily, weekly, monthly, isLoading }
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
