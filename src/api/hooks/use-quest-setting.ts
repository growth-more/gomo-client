import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { endpoints, fetches } from '@/api'
import { QuestProperty } from '@/entities'
import { useCallback, useMemo } from 'react'
import { UpdateQuestPropertyRequest } from '../types'

export function useQuestSetting() {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['GET', endpoints.member.getQuestProperty],
    queryFn: fetches.member.getQuestProperty,
  })

  const { mutate } = useMutation({
    mutationKey: ['PUT', endpoints.member.updateQuestProperty],
    mutationFn: fetches.member.updateQuestProperty,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.member.getQuestProperty] }),
  })

  const update = useCallback(
    (request: UpdateQuestPropertyRequest, onSuccess?: () => void, onError?: () => void) => {
      mutate(request, {
        onSuccess: () => onSuccess?.(),
        onError: () => onError?.(),
      })
    },
    [mutate]
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
