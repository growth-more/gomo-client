import { endpoints, fetches } from '@/api'
import { errorCode } from '@/api/error'
import { apiMutate } from '@/api/hooks/api-mutate'
import { QueryCallback } from '@/api/hooks/error-handler'
import { CreateEmailAuthCodeRequest } from '@/api/types'
import { toast } from '@/components/toast'
import { useMutation } from '@tanstack/react-query'

interface CreateAuthCodeCallback extends QueryCallback {
  onEmailDuplicated?: () => void
}

export function useCreateAuthCode() {
  const { mutate } = useMutation({
    mutationKey: ['POST', endpoints.member.createSignUpEmailCode],
    mutationFn: fetches.member.createEmailCode,
  })

  const createAuthCode = (body: CreateEmailAuthCodeRequest, callback?: CreateAuthCodeCallback) => {
    apiMutate(
      mutate,
      { body },
      {
        onSuccess: () => {
          toast.success('인증 코드가 발송되었습니다.')
          callback?.onSuccess?.()
        },
        onError: () => {
          callback?.onError?.()
        },
        onCode: {
          [errorCode.auth.join.EMAIL_DUPLICATED]: () => {
            toast.warning('이미 가입된 이메일입니다.')
            callback?.onEmailDuplicated?.()
          },
        },
        onElse: () => {
          toast.error('이메일 인증 코드 생성에 실패했습니다.')
          callback?.onElse?.()
        },
      }
    )
  }

  return { createAuthCode }
}
