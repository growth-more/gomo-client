import { useMutation, useQuery } from '@tanstack/react-query'
import { endpoints, fetches } from '@/api'
import { QuestProperty } from '@/entities'
import { useCallback, useMemo } from 'react'
import { UpdateQuestPropertyRequest } from '../types'

export function useQuestSetting() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['GET', endpoints.member.getQuestProperty],
    queryFn: fetches.member.getQuestProperty,
  })

  const { mutate } = useMutation({
    mutationKey: ['PUT', endpoints.member.updateQuestProperty],
    mutationFn: fetches.member.updateQuestProperty,
  })

  const update = useCallback(
    (request: UpdateQuestPropertyRequest, onSuccess?: () => void, onError?: () => void) => {
      mutate(request, {
        onSuccess: () => {
          refetch()
          onSuccess?.()
        },
        onError: () => {
          onError?.()
        },
      })
    },
    [mutate, refetch]
  )

  const questProperty = useMemo<QuestProperty>(() => {
    if (!data) {
      return {
        dailyThreshold: 0,
        weeklyThreshold: 0,
        monthlyThreshold: 0,
      }
    }
    return data
  }, [data])

  return { questProperty, isLoading, update }
}
