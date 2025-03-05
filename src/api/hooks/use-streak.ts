import { useQuery } from '@tanstack/react-query'
import { endpoints, fetches } from '@/api'
import { useMemo } from 'react'
import { OrganizedStreak } from '@/entities'

export function useStreak(startDate: Date, endDate: Date) {
  const { data: streakData, isLoading } = useQuery({
    queryKey: ['GET', endpoints.streak.getStreak],
    queryFn: () => fetches.streak.getStreak({ startDate, endDate }),
  })

  const streak = useMemo<OrganizedStreak>(() => {
    if (!streakData) {
      return { all: [], daily: [], weekly: [], monthly: [] }
    }

    const daily = streakData.dailyStreaks.map((streak) => ({
      date: streak.filledDate,
      count: streak.completedQuestCount,
    }))

    const weekly = streakData.weeklyStreaks.map((streak) => ({
      date: streak.filledDate,
      count: streak.completedQuestCount,
    }))

    const monthly = streakData.monthlyStreaks.map((streak) => ({
      date: streak.filledDate,
      count: streak.completedQuestCount,
    }))

    const all = [...daily, ...weekly, ...monthly]

    return { all, daily, weekly, monthly }
  }, [streakData])

  return { streak, isLoading }
}
