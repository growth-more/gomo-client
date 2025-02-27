import { useQuery } from '@tanstack/react-query'
import { endpoints, fetches } from '@/api'

export function useHistory(year: number, month: number) {
  const { data: history, isLoading } = useQuery({
    queryKey: ['GET', endpoints.quest.getHistoryAssignQuest, year, month],
    queryFn: () => fetches.quest.getAssignQuestHistory({ year, month }),
  })

  return { history, isLoading }
}
