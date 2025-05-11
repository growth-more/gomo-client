import { endpoints, fetches } from '@/api'
import { errorCode } from '@/api/error'
import { apiMutate } from '@/api/hooks/api-mutate'
import { QueryCallback } from '@/api/hooks/error-handler'
import { CreateMemberRequest } from '@/api/types'
import { toast } from '@/components/toast'
import { useMutation } from '@tanstack/react-query'

interface CreateMemberCallback extends QueryCallback {
  onPasswordInvalidParameter?: () => void
}

export function useCreateMember() {
  const { mutate } = useMutation({
    mutationKey: ['POST', endpoints.member.create],
    mutationFn: fetches.member.create,
  })

  const join = (body: CreateMemberRequest, callback?: CreateMemberCallback) => {
    apiMutate(
      mutate,
      { body },
      {
        onSuccess: () => {
          callback?.onSuccess?.()
        },
        onError: () => {
          callback?.onError?.()
        },
        onCode: {
          [errorCode.auth.join.PASSWORD_INVALID_PARAMETER]: () => {
            toast.error('비밀번호 형식이 올바르지 않습니다.')
            callback?.onPasswordInvalidParameter?.()
          },
        },
        onElse: () => {
          toast.error('회원가입에 실패했습니다.')
          callback?.onElse?.()
        },
      }
    )
  }

  return { join }
}
