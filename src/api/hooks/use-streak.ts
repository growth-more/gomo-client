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
      return { daily: [], weekly: [], monthly: [] }
    }
    return {
      daily: streakData.dailyStreaks.map((streak) => ({
        date: streak.filledDate,
        count: streak.completedQuestCount,
      })),
      weekly: streakData.weeklyStreaks.map((streak) => ({
        date: streak.filledDate,
        count: streak.completedQuestCount,
      })),
      monthly: streakData.monthlyStreaks.map((streak) => ({
        date: streak.filledDate,
        count: streak.completedQuestCount,
      })),
    }
  }, [streakData])

  return { streak, isLoading }
}
