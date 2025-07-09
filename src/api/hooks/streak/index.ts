import { useGetAchievement } from '@/api/hooks/streak/use-get-achievement'
import { useGetStreak } from './use-get-streak'

export * from './use-get-streak'
export * from './use-get-achievement'

export function useStreak(startDate: Date, endDate: Date) {
  const { streak, isLoading } = useGetStreak(startDate, endDate)
  const { achievement } = useGetAchievement()

  return { streak, achievement, isLoading }
}
