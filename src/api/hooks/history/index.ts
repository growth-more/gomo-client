import { useGetHistory } from './use-get-history'
import { useGetDailyTotalHistory } from './use-get-daily-total-history'

export * from './use-get-history'
export * from './use-get-daily-total-history'

export function useHistory(year: number, month: number) {
  const { history, isLoading } = useGetHistory(year, month)
  const { dailyTotalHistory } = useGetDailyTotalHistory(year, month)

  return { history, dailyTotalHistory, isLoading }
}
