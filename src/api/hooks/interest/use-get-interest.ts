import { fetches, endpoints } from '@/api'
import { Interest } from '@/entities/interest'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useGetInterest() {
  const { data, isLoading } = useQuery({
    queryKey: ['GET', endpoints.interest.getList],
    queryFn: fetches.interest.getList,
  })

  const interests = useMemo<Interest[]>(() => {
    if (!data) {
      return []
    }
    return data.interests
  }, [data])

  return { interests, isLoading }
}
