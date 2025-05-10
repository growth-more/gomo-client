import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { endpoints, fetches } from '@/api'
import { useMemo } from 'react'
import { Interest } from '@/entities/interest'
import {
  CreateInterestRequest,
  UpdateInterestLogoRequest,
  UpdateInterestRequest,
} from '@/api/types'
import { apiErrorHandler, QueryCallback } from '@/api/hooks/error-handler'
import { toast } from '@/components/toast'
import { errorCode } from '@/api/error'

export function useInterest() {
  const queryClient = useQueryClient()

  // Get Interest List

  const { data: interestListData, isLoading } = useQuery({
    queryKey: ['GET', endpoints.interest.getList],
    queryFn: fetches.interest.getList,
  })

  const interestList = useMemo<Interest[]>(() => {
    if (!interestListData) {
      return []
    }
    return interestListData.interests
  }, [interestListData])

  // Create Interest

  const { mutate: createInterestMutation } = useMutation({
    mutationKey: ['POST', endpoints.interest.create],
    mutationFn: fetches.interest.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.interest.getList] })
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.interest.getGraph] })
    },
  })

  interface CreateInterestCallback extends QueryCallback {
    onInvalidParameter?: () => void
    onImageTooLarge?: () => void
  }

  const createInterest = (body: CreateInterestRequest, callback?: CreateInterestCallback) => {
    createInterestMutation(
      { body },
      {
        onSuccess: () => {
          toast.success('관심사가 추가되었습니다.')
          callback?.onSuccess?.()
        },
        onError: (err) => {
          apiErrorHandler(err, {
            onElse: () => {
              toast.error('관심사 추가에 실패했습니다.')
              callback?.onError?.()
            },
            onCode: {
              [errorCode.interest.create.INVALID_PARAMETER]: () => {
                toast.warning('관심사 이름에 사용할 수 없는 단어가 사용되었습니다.')
                callback?.onInvalidParameter?.()
              },
              [errorCode.interest.create.IMAGE_TOO_LARGE]: () => {
                toast.warning('이미지 크기가 너무 큽니다.')
                callback?.onImageTooLarge?.()
              },
            },
          })
        },
      }
    )
  }

  // Update Interest

  const { mutate: updateInterestMutation } = useMutation({
    mutationKey: ['PUT', endpoints.interest.update],
    mutationFn: fetches.interest.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.interest.getList] })
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.interest.getGraph] })
    },
  })

  interface UpdateInterestCallback extends QueryCallback {
    onInvalidParameter?: () => void
  }

  const updateInterest = (
    id: string,
    body: UpdateInterestRequest,
    callback?: UpdateInterestCallback
  ) => {
    updateInterestMutation(
      { id, body },
      {
        onSuccess: () => {
          toast.success('관심사가 수정되었습니다.')
          callback?.onSuccess?.()
        },
        onError: (err) => {
          apiErrorHandler(err, {
            onElse: () => {
              toast.error('관심사 수정에 실패했습니다.')
              callback?.onError?.()
            },
            onCode: {
              [errorCode.interest.update.INVALID_PARAMETER]: () => {
                toast.warning('관심사 이름에 사용할 수 없는 단어가 사용되었습니다.')
                callback?.onInvalidParameter?.()
              },
            },
          })
        },
      }
    )
  }

  // Delete Interest

  const { mutate: deleteInterestMutation } = useMutation({
    mutationKey: ['DELETE', endpoints.interest.delete],
    mutationFn: fetches.interest.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.interest.getList] })
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.interest.getGraph] })
    },
  })

  const deleteInterest = (id: string, callback?: QueryCallback) => {
    deleteInterestMutation(
      { id },
      {
        onSuccess: () => {
          toast.success('관심사가 삭제되었습니다.')
          callback?.onSuccess?.()
        },
        onError: (err) => {
          apiErrorHandler(err, {
            onElse: () => {
              toast.error('관심사 삭제에 실패했습니다.')
              callback?.onError?.()
            },
          })
        },
      }
    )
  }

  // Update Interest Logo

  const { mutate: updateInterestLogoMutation } = useMutation({
    mutationKey: ['PUT', endpoints.interest.updateLogo],
    mutationFn: fetches.interest.updateLogo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.interest.getList] })
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.interest.getGraph] })
    },
  })

  interface UpdateInterestLogoCallback extends QueryCallback {
    onImageTooLarge?: () => void
  }

  const updateInterestLogo = (
    id: string,
    body: UpdateInterestLogoRequest,
    callback?: UpdateInterestLogoCallback
  ) => {
    updateInterestLogoMutation(
      { id, body },
      {
        onSuccess: () => {
          toast.success('관심사 로고가 수정되었습니다.')
          callback?.onSuccess?.()
        },
        onError: (err) => {
          apiErrorHandler(err, {
            onElse: () => {
              toast.error('관심사 로고 수정에 실패했습니다.')
              callback?.onError?.()
            },
            onCode: {
              [errorCode.interest.update.IMAGE_TOO_LARGE]: () => {
                toast.warning('이미지 크기가 너무 큽니다.')
                callback?.onImageTooLarge?.()
              },
            },
          })
        },
      }
    )
  }

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
  const { data: interestData, isLoading } = useQuery({
    queryKey: ['GET', endpoints.interest.get, id],
    queryFn: () => fetches.interest.get({ id }),
    enabled: !!id,
  })

  const interest = useMemo<Interest | null>(() => {
    if (!interestData) {
      return null
    }
    return interestData
  }, [interestData])

  return { interest, isLoading }
}
