import { endpoints } from '@/api/endpoints'
import { fetches } from '@/api/fetches'
import { WidgetSnapshot } from '@/components/widget'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useGetWidgetSnapshot() {
  const { data, isLoading } = useQuery({
    queryKey: ['GET', endpoints.member.getWidget],
    queryFn: fetches.member.getWidget,
  })

  const snapshot = useMemo<WidgetSnapshot>(() => {
    if (!data) {
      return {
        mediaWidth1: [],
        mediaWidth2: [],
        mediaWidth3: [],
      }
    }
    return JSON.parse(data.snapshot) as WidgetSnapshot
  }, [data])

  return { snapshot, isLoading }
}
