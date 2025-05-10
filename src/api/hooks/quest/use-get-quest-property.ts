import { endpoints, fetches } from '@/api'
import { QuestProperty } from '@/entities/quest'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useGetQuestProperty() {
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

  return { questProperty, isLoading }
}
