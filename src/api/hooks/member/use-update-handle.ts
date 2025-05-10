import { endpoints, fetches } from '@/api'
import { apiMutate } from '@/api/hooks/api-mutate'
import { QueryCallback } from '@/api/hooks/error-handler'
import { useCheckHandleDuplicate } from '@/api/hooks/member'
import { toast } from '@/components/toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface UpdateHandleCallback extends QueryCallback {
  onDuplicated?: () => void
  onInvalidParameter?: () => void
}

export function useUpdateHandle() {
  const queryClient = useQueryClient()

  const { checkHandleDuplicate } = useCheckHandleDuplicate()

  const { mutate } = useMutation({
    mutationKey: ['PUT', endpoints.member.updateHandle],
    mutationFn: fetches.member.updateHandle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.member.profile] })
    },
  })

  const updateHandleMutate = (handle: string, callback?: UpdateHandleCallback) => {
    apiMutate(
      mutate,
      { body: { handle } },
      {
        onSuccess: () => {
          toast.success('핸들이 변경되었습니다.')
          callback?.onSuccess?.()
        },
        onError: () => {
          callback?.onError?.()
        },
        onElse: () => {
          toast.error('핸들 변경에 실패했습니다.')
          callback?.onElse?.()
        },
      }
    )
  }

  const updateHandle = (handle: string, callback?: UpdateHandleCallback) => {
    checkHandleDuplicate(handle, {
      onSuccess: () => updateHandleMutate(handle, callback),
    })
  }

  return { updateHandle }
}
