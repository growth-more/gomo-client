import { fetches, endpoints } from '@/api'
import { InterestEdge, InterestGraph, InterestVertex } from '@/entities/interest'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import * as d3 from 'd3'

const NODE_MIN_SIZE = 3
const NODE_MAX_SIZE = 20

const MIN_LEVEL = 0
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

    const vertex: InterestVertex[] =
      data.interests?.map((interest) => ({
        id: interest.id,
        name: interest.name,
        size: getNodeSize(interest.level),
        color: interest.colorCode,
        interest,
      })) ?? []

    const edge: InterestEdge[] =
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
  const adjustedLevel = level - MIN_LEVEL
  const levelGroup = Math.ceil(adjustedLevel / 10)
  const maxGroup = Math.ceil(MAX_LEVEL / 10)

  return d3.scaleLinear().domain([1, maxGroup]).range([NODE_MIN_SIZE, NODE_MAX_SIZE]).clamp(true)(
    levelGroup
  )
}
