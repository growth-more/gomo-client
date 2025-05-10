import { endpoints, fetches } from '@/api'
import { errorCode } from '@/api/error'
import { apiMutate } from '@/api/hooks/api-mutate'
import { QueryCallback } from '@/api/hooks/error-handler'
import { useGetProfile } from '@/api/hooks/member'
import { toast } from '@/components/toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface UpdateMottoCallback extends QueryCallback {
  onInvalidParameter?: () => void
}

export function useUpdateMotto() {
  const queryClient = useQueryClient()

  const {
    profile: { name },
  } = useGetProfile()

  const { mutate } = useMutation({
    mutationKey: ['PUT', endpoints.member.update],
    mutationFn: fetches.member.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.member.profile] })
    },
  })

  const updateMotto = (motto: string, callback?: UpdateMottoCallback) => {
    apiMutate(
      mutate,
      { body: { name, motto } },
      {
        onSuccess: () => {
          toast.success('모토가 변경되었습니다.')
          callback?.onSuccess?.()
        },
        onError: () => {
          callback?.onError?.()
        },
        onCode: {
          [errorCode.profile.motto.INVALID_PARAMETER]: () => {
            toast.warning('사용할 수 없는 단어가 사용되었습니다.')
            callback?.onInvalidParameter?.()
          },
        },
        onElse: () => {
          toast.error('모토 변경에 실패했습니다.')
          callback?.onElse?.()
        },
      }
    )
  }

  return { updateMotto }
}
