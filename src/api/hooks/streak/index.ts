import { useGetStreak } from './use-get-streak'

export * from './use-get-streak'

export function useStreak(startDate: Date, endDate: Date) {
  const { streak, isLoading } = useGetStreak(startDate, endDate)

  return { streak, isLoading }
}
