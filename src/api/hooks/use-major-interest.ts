import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { endpoints, fetches } from '@/api'
import { useMemo } from 'react'
import { MajorInterest } from '@/entities/interest'

export function useMajorInterest() {
  const queryClient = useQueryClient()

  const { data: majorInterestData, isLoading } = useQuery({
    queryKey: ['GET', endpoints.interest.getMajorInterest],
    queryFn: fetches.interest.getMajorInterest,
  })

  const { mutate: createMajorInterest } = useMutation({
    mutationKey: ['POST', endpoints.interest.createMajorInterest],
    mutationFn: fetches.interest.createMajorInterest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.interest.getMajorInterest] })
    },
  })

  const { mutate: deleteMajorInterest } = useMutation({
    mutationKey: ['DELETE', endpoints.interest.deleteMajorInterest],
    mutationFn: fetches.interest.deleteMajorInterest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.interest.getMajorInterest] })
    },
  })

  const { mutate: reorderMajorInterest } = useMutation({
    mutationKey: ['PUT', endpoints.interest.updateMajorInterestOrder],
    mutationFn: fetches.interest.updateMajorInterestOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.interest.getMajorInterest] })
    },
  })

  const majorInterest = useMemo<MajorInterest[]>(() => {
    if (!majorInterestData) {
      return []
    }
    return majorInterestData.majorInterests
  }, [majorInterestData])

  return {
    majorInterest,
    isLoading,
    createMajorInterest,
    deleteMajorInterest,
    reorderMajorInterest,
  }
}
