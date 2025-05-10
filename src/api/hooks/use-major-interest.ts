import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { endpoints, fetches } from '@/api'
import { useMemo } from 'react'
import { MajorInterest } from '@/entities/interest'
import { CreateMajorInterestFetchRequest } from '@/api/types'
import { apiErrorHandler, QueryCallback } from '@/api/hooks/error-handler'
import { toast } from '@/components/toast'
import { errorCode } from '@/api/error'

export function useMajorInterest() {
  const queryClient = useQueryClient()

  // Get Major Interest

  const { data: majorInterestData, isLoading } = useQuery({
    queryKey: ['GET', endpoints.interest.getMajorInterest],
    queryFn: fetches.interest.getMajorInterest,
  })

  const majorInterest = useMemo<MajorInterest[]>(() => {
    if (!majorInterestData) {
      return []
    }
    return majorInterestData.majorInterests
  }, [majorInterestData])

  // Create Major Interest

  const { mutate: createMajorInterestMutation } = useMutation({
    mutationKey: ['POST', endpoints.interest.createMajorInterest],
    mutationFn: fetches.interest.createMajorInterest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.interest.getMajorInterest] })
    },
  })

  interface CreateMajorInterestCallback extends QueryCallback {
    onDuplicated?: () => void
  }

  const createMajorInterest = (
    body: CreateMajorInterestFetchRequest,
    callback?: CreateMajorInterestCallback
  ) => {
    createMajorInterestMutation(body, {
      onSuccess: () => {
        toast.success('주요 관심사에 등록되었습니다.')
        callback?.onSuccess?.()
      },
      onError: (err) => {
        apiErrorHandler(err, {
          onElse: () => {
            toast.error('주요 관심사 등록에 실패했습니다.')
            callback?.onError?.()
          },
          onCode: {
            [errorCode.interest.major.DUPLICATED]: () => {
              toast.warning('이미 등록된 주요 관심사입니다.')
              callback?.onDuplicated?.()
            },
          },
        })
      },
    })
  }

  // Delete Major Interest

  const { mutate: deleteMajorInterestMutation } = useMutation({
    mutationKey: ['DELETE', endpoints.interest.deleteMajorInterest],
    mutationFn: fetches.interest.deleteMajorInterest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.interest.getMajorInterest] })
    },
  })

  const deleteMajorInterest = (id: string, callback?: QueryCallback) => {
    deleteMajorInterestMutation(
      { id },
      {
        onSuccess: () => {
          toast.success('주요 관심사에서 해제되었습니다.')
          callback?.onSuccess?.()
        },
        onError: (err) => {
          apiErrorHandler(err, {
            onElse: () => {
              toast.error('주요 관심사 해제에 실패했습니다.')
              callback?.onError?.()
            },
          })
        },
      }
    )
  }

  // Reorder Major Interest

  const { mutate: reorderMajorInterest } = useMutation({
    mutationKey: ['PUT', endpoints.interest.updateMajorInterestOrder],
    mutationFn: fetches.interest.updateMajorInterestOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.interest.getMajorInterest] })
    },
  })

  return {
    majorInterest,
    isLoading,
    createMajorInterest,
    deleteMajorInterest,
    reorderMajorInterest,
  }
}
