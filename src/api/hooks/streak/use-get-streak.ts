import { endpoints, fetches } from '@/api'
import { OrganizedStreak } from '@/entities'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useGetStreak(startDate: Date, endDate: Date) {
  const { data, isLoading } = useQuery({
    queryKey: ['GET', endpoints.streak.getStreak],
    queryFn: () => fetches.streak.getStreak({ startDate, endDate }),
  })

  const streak = useMemo<OrganizedStreak>(() => {
    if (!data) {
      return { all: [], daily: [], weekly: [], monthly: [] }
    }

    const daily = data.dailyStreaks?.map((streak) => ({
      date: streak.filledDate,
      count: streak.completedQuestCount,
    }))

    const weekly = data.weeklyStreaks?.map((streak) => ({
      date: streak.filledDate,
      count: streak.completedQuestCount,
    }))

    const monthly = data.monthlyStreaks?.map((streak) => ({
      date: streak.filledDate,
      count: streak.completedQuestCount,
    }))

    const all = [...daily, ...weekly, ...monthly]

    return { all, daily, weekly, monthly }
  }, [data])

  return { streak, isLoading }
}
