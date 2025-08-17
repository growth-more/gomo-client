import { endpoints, fetches } from '@/api'
import { Interest } from '@/entities/interest'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useGetOneInterest(id: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['GET', endpoints.interest.getWithId(id)],
    queryFn: () => fetches.interest.get({ id }),
  })

  const interest = useMemo<Interest | null>(() => {
    if (!data) {
      return null
    }
    return data
  }, [data])

  return { interest, isLoading }
}
