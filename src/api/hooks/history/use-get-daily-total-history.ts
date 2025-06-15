import { useGetHistory } from '@/api/hooks/history'
import { DailyTotalAssignQuestHistory } from '@/entities'

import { useMemo } from 'react'

export function useGetDailyTotalHistory(year: number, month: number) {
  const { history } = useGetHistory(year, month)

  const dailyTotalHistory = useMemo<DailyTotalAssignQuestHistory[]>(() => {
    return history.map((e) => ({
      date: e.date,
      dailyCount: e.history.filter((e) => e.questType === 'DAILY').length,
      weeklyCount: e.history.filter((e) => e.questType === 'WEEKLY').length,
      monthlyCount: e.history.filter((e) => e.questType === 'MONTHLY').length,
    }))
  }, [history])

  return { dailyTotalHistory }
}
