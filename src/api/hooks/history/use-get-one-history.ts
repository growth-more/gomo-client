import { endpoints, fetches } from '@/api'
import { AssignQuestHistory } from '@/entities'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useGetOneHistory(date: Date | null) {
  const { year, month, day } = useMemo(() => {
    if (!date) {
      return { year: 0, month: 0, day: 0 }
    }
    return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() }
  }, [date])

  const { data, isLoading } = useQuery({
    queryKey: ['GET', endpoints.quest.getAssignQuestHistory, year, month, day, 'DAY'],
    queryFn: () => fetches.quest.getAssignQuestHistory({ year, month, day, periodType: 'DAY' }),
    enabled: !!date,
  })

  const history = useMemo<AssignQuestHistory[]>(() => {
    if (!data) {
      return []
    }
    return data.assignQuests
  }, [data])

  return { history, isLoading }
}
