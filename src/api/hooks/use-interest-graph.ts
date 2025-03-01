import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { endpoints, fetches } from '@/api'
import { useMemo } from 'react'
import { InterestGraph } from '@/entities/interest'
import * as d3 from 'd3'

const NODE_MIN_SIZE = 1
const NODE_MAX_SIZE = 20

const MIN_LEVEL = 1
const MAX_LEVEL = 100

export function useInterestGraph() {
  const queryClient = useQueryClient()

  const { data: interestGraphData, isLoading } = useQuery({
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

  const interestGraph = useMemo<InterestGraph>(() => {
    if (!interestGraphData) {
      return {
        vertex: [],
        edge: [],
      }
    }

    return {
      vertex:
        interestGraphData.interests?.map((interest) => ({
          id: interest.id,
          name: interest.name,
          size: getNodeSize(interest.level),
          interest,
        })) ?? [],
      edge:
        interestGraphData.relations?.map((relation) => ({
          source: relation.parentInterestId,
          target: relation.childInterestId,
        })) ?? [],
    }
  }, [interestGraphData])

  return { interestGraph, isLoading, createEdge, deleteEdge }
}

function getNodeSize(level: number) {
  return d3
    .scalePow()
    .exponent(2)
    .domain([MIN_LEVEL, MAX_LEVEL])
    .range([NODE_MIN_SIZE, NODE_MAX_SIZE])
    .clamp(true)(level)
}
