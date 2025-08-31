import { fetches } from '@/api'
import { MajorInterest } from '@/entities/interest'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useGetMajorInterest() {
  const { data, isLoading } = useQuery({
    queryKey: ['INTEREST', 'MAJOR_INTEREST'],
    queryFn: fetches.interest.getMajorInterest,
  })

  const majorInterest = useMemo<MajorInterest[]>(() => {
    if (!data) {
      return []
    }
    return data.majorInterests
  }, [data])

  return { majorInterest, isLoading }
}
