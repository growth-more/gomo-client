import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { endpoints, fetches } from '@/api'
import { useMemo } from 'react'
import { InterestGraph } from '@/entities/interest'
import * as d3 from 'd3'
import { CreateInterestEdgeRequest } from '@/api/types'
import { toast } from '@/components/toast'
import { apiErrorHandler, QueryCallback } from '@/api/hooks/error-handler'

const NODE_MIN_SIZE = 1
const NODE_MAX_SIZE = 20

const MIN_LEVEL = 1
const MAX_LEVEL = 100

export function useInterestGraph() {
  const queryClient = useQueryClient()

  // Get Interest Graph

  const { data: interestGraphData, isLoading } = useQuery({
    queryKey: ['GET', endpoints.interest.getGraph],
    queryFn: fetches.interest.getGraph,
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
          id: relation.id,
          source: relation.parentInterestId,
          target: relation.childInterestId,
        })) ?? [],
    }
  }, [interestGraphData])

  // Create Edge

  const { mutate: createEdgeMutation } = useMutation({
    mutationKey: ['POST', endpoints.interest.createEdge],
    mutationFn: fetches.interest.createEdge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.interest.getGraph] })
    },
  })

  const createEdge = (body: CreateInterestEdgeRequest, callback?: QueryCallback) => {
    createEdgeMutation(
      { body },
      {
        onSuccess: () => {
          toast.success('관심사 연결이 추가되었습니다.')
        },
        onError: (err) => {
          apiErrorHandler(err, {
            onError: () => {
              toast.error('관심사 연결에 실패했습니다.')
              callback?.onError?.()
            },
          })
        },
      }
    )
  }

  // Delete Edge

  const { mutate: deleteEdgeMutation } = useMutation({
    mutationKey: ['DELETE', endpoints.interest.deleteEdge],
    mutationFn: fetches.interest.deleteEdge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.interest.getGraph] })
    },
  })

  const deleteEdge = (id: string, callback?: QueryCallback) => {
    deleteEdgeMutation(
      { id },
      {
        onSuccess: () => {
          toast.success('관심사 연결이 삭제되었습니다.')
        },
        onError: (err) => {
          apiErrorHandler(err, {
            onError: () => {
              toast.error('관심사 연결 삭제에 실패했습니다.')
              callback?.onError?.()
            },
          })
        },
      }
    )
  }

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
