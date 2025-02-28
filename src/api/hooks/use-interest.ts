import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { endpoints, fetches } from '@/api'

export function useInterest() {
  const queryClient = useQueryClient()

  const { data: interestList, isLoading } = useQuery({
    queryKey: ['GET', endpoints.interest.getList],
    queryFn: fetches.interest.getList,
  })

  const { mutate: createInterest } = useMutation({
    mutationKey: ['POST', endpoints.interest.create],
    mutationFn: fetches.interest.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.interest.getList] })
    },
  })

  const { mutate: updateInterest } = useMutation({
    mutationKey: ['PUT', endpoints.interest.update],
    mutationFn: fetches.interest.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.interest.getList] })
    },
  })

  const { mutate: deleteInterest } = useMutation({
    mutationKey: ['DELETE', endpoints.interest.delete],
    mutationFn: fetches.interest.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.interest.getList] })
    },
  })

  const { mutate: updateInterestLogo } = useMutation({
    mutationKey: ['PUT', endpoints.interest.updateLogo],
    mutationFn: fetches.interest.updateLogo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.interest.getList] })
    },
  })

  return {
    interestList,
    isLoading,
    createInterest,
    updateInterest,
    deleteInterest,
    updateInterestLogo,
  }
}

export function useOneInterest(id: string) {
  const { data: interest, isLoading } = useQuery({
    queryKey: ['GET', endpoints.interest.get, id],
    queryFn: () => fetches.interest.get({ id }),
    enabled: !!id,
  })

  return { interest, isLoading }
}
