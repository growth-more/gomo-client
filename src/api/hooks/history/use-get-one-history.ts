import { endpoints, fetches } from '@/api'
import { AssignQuestHistory } from '@/entities'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useMemo } from 'react'

export function useGetOneHistory(date: Date | null) {
  const dayFormat = dayjs(date).format('YYYY-MM-DD')

  const { data, isLoading } = useQuery({
    queryKey: ['GET', endpoints.quest.getAssignQuestHistory, dayFormat, dayFormat],
    queryFn: () =>
      fetches.quest.getAssignQuestHistory({ start: date!, end: date!, isCompleted: true }),
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
