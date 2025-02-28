import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { endpoints, fetches } from '@/api'

export function useInterestGraph() {
  const queryClient = useQueryClient()

  const { data: interestGraph, isLoading } = useQuery({
    queryKey: ['GET', endpoints.interest.getGraph],
    queryFn: fetches.interest.getGraph,
  })

  const { mutate: createEdge } = useMutation({
    mutationKey: ['POST', endpoints.interest.createEdge],
    mutationFn: fetches.interest.createEdge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.interest.getGraph] })
    },
  })

  const { mutate: deleteEdge } = useMutation({
    mutationKey: ['DELETE', endpoints.interest.deleteEdge],
    mutationFn: fetches.interest.deleteEdge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.interest.getGraph] })
    },
  })

  return { interestGraph, isLoading, createEdge, deleteEdge }
}
