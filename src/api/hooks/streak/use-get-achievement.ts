import { endpoints, fetches } from '@/api'
import { Achievement } from '@/entities'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useGetAchievement() {
  const { data, isLoading } = useQuery({
    queryKey: ['GET', endpoints.streak.getAchiever],
    queryFn: () => fetches.streak.getAchiever(),
  })

  const achievement = useMemo<Achievement>(() => {
    if (!data) {
      return { longestStreakDays: 0, currentStreakDays: 0 }
    }

    return data
  }, [data])

  return { achievement, isLoading }
}
