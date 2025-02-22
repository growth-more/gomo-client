import { useQuery } from '@tanstack/react-query'
import { endpoints, fetches } from '@/api'
import { QuestProperty } from '@/entities'
import { useMemo } from 'react'

export function useQuestSetting() {
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
