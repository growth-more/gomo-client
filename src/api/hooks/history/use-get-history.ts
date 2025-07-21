import { endpoints, fetches } from '@/api'
import { OrganizedAssignQuestHistory } from '@/entities'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import _ from 'lodash'
import { useMemo } from 'react'

export function useGetHistory(year: number, month: number) {
  const { data, isLoading } = useQuery({
    queryKey: ['GET', endpoints.quest.getAssignQuestHistory, year, month, 0, 'MONTH'],
    queryFn: () => fetches.quest.getAssignQuestHistory({ year, month, periodType: 'MONTH' }),
  })

  const history = useMemo<OrganizedAssignQuestHistory[]>(() => {
    if (!data) {
      return []
    }

    return _(data.assignQuests)
      .filter((quest) => quest.completedDateTime !== null)
      .groupBy((quest) => dayjs(quest.completedDateTime).format('YYYY-MM-DD'))
      .map<OrganizedAssignQuestHistory>((history, key) => ({
        date: dayjs(key).toDate(),
        history,
      }))
      .sortBy((history) => history.date.getTime())
      .reverse()
      .value()
  }, [data])

  return { history, isLoading }
}
