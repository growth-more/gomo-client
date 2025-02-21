import { useQuery } from '@tanstack/react-query'
import { endpoints, fetches } from '@/api'
import { useMemo } from 'react'
import { AssignQuest, OrganizedAssignQuest } from '@/entities'

export function useAssignQuest() {
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

  return { daily, weekly, monthly, isLoading }
}

function organizeAssignQuest(quests: AssignQuest[]) {
  const completed: AssignQuest[] = []
  const confirmed: AssignQuest[] = []
  const unconfirmed: AssignQuest[] = []

  quests.forEach((quest) => {
    console.log(quest)
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
