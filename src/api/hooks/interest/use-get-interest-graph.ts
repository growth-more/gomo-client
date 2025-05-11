import { fetches, endpoints } from '@/api'
import { InterestGraph } from '@/entities/interest'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import * as d3 from 'd3'

const NODE_MIN_SIZE = 1
const NODE_MAX_SIZE = 20

const MIN_LEVEL = 1
const MAX_LEVEL = 100

export function useGetInterestGraph() {
  const { data, isLoading } = useQuery({
    queryKey: ['GET', endpoints.interest.getGraph],
    queryFn: fetches.interest.getGraph,
  })

  const interestGraph = useMemo<InterestGraph>(() => {
    if (!data) {
      return {
        vertex: [],
        edge: [],
      }
    }

    const vertex =
      data.interests?.map((interest) => ({
        id: interest.id,
        name: interest.name,
        size: getNodeSize(interest.level),
        interest,
      })) ?? []

    const edge =
      data.relations?.map((relation) => ({
        id: relation.id,
        source: relation.parentInterestId,
        target: relation.childInterestId,
      })) ?? []

    return { vertex, edge }
  }, [data])

  return { interestGraph, isLoading }
}

function getNodeSize(level: number) {
  return d3
    .scalePow()
    .exponent(2)
    .domain([MIN_LEVEL, MAX_LEVEL])
    .range([NODE_MIN_SIZE, NODE_MAX_SIZE])
    .clamp(true)(level)
}
