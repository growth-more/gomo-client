import { useQuery } from '@tanstack/react-query'
import { endpoints, fetches } from '@/api'
import { useMemo } from 'react'
import { OrganizedAssignQuestHistory } from '@/entities'
import dayjs from 'dayjs'
import _ from 'lodash'

export function useHistory(year: number, month: number) {
  const { data: historyData, isLoading } = useQuery({
    queryKey: ['GET', endpoints.quest.getAssignQuestHistory, year, month],
    queryFn: () => fetches.quest.getAssignQuestHistory({ year, month }),
  })

  const history = useMemo<OrganizedAssignQuestHistory[]>(() => {
    if (!historyData) {
      return []
    }

    return _(historyData.assignQuests)
      .filter((quest) => quest.completedDateTime !== null)
      .groupBy((quest) => dayjs(quest.completedDateTime).format('YYYY-MM-DD'))
      .map<OrganizedAssignQuestHistory>((history, key) => ({
        date: dayjs(key).toDate(),
        history,
      }))
      .sortBy((history) => history.date.getTime())
      .reverse()
      .value()
  }, [historyData])

  return { history, isLoading }
}
