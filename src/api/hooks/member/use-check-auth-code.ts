import { endpoints, fetches } from '@/api'
import { apiMutate } from '@/api/hooks/api-mutate'
import { QueryCallback } from '@/api/hooks/error-handler'
import { toast } from '@/components/toast'
import { useMutation } from '@tanstack/react-query'

interface CheckAuthCodeCallback extends QueryCallback {
  onInvalidParameter?: () => void
}

export function useCheckAuthCode() {
  const { mutate } = useMutation({
    mutationKey: ['POST', endpoints.member.verifyEmailCode],
    mutationFn: fetches.member.verifyEmailCode,
  })

  const checkAuthCode = (email: string, code: string, callback?: CheckAuthCodeCallback) => {
    apiMutate(
      mutate,
      { email, code },
      {
        onSuccess: () => {
          toast.success('인증이 완료되었습니다.')
          callback?.onSuccess?.()
        },
        onError: () => {
          callback?.onError?.()
        },
        onElse: () => {
          toast.error('이메일 인증 코드가 올바르지 않습니다.')
          callback?.onElse?.()
        },
      }
    )
  }

  return { checkAuthCode }
}
