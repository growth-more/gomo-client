import { endpoints, fetches } from '@/api'
import { OrganizedRepeatQuest } from '@/entities/quest'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useGetRepeatQuest() {
  const { data, isLoading } = useQuery({
    queryKey: ['GET', endpoints.quest.getRepeatQuest],
    queryFn: fetches.quest.getRepeatQuest,
  })

  const repeatQuest = useMemo<OrganizedRepeatQuest>(() => {
    const daily = data?.dailyQuests ?? []
    const weekly = data?.weeklyQuests ?? []
    const monthly = data?.monthlyQuests ?? []
    return { daily, weekly, monthly }
  }, [data])

  return { repeatQuest, isLoading }
}
