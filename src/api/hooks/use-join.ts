import { useMutation } from '@tanstack/react-query'
import { endpoints, fetches } from '@/api'
import {
  CreateEmailAuthCodeRequest,
  CreateMemberRequest,
  VerifyEmailCodeFetchRequest,
} from '@/api/types'
import { apiErrorHandler, QueryCallback } from '@/api/hooks/error-handler'
import { errorCode } from '@/api/error'
import { toast } from '@/components/toast'

export function useJoin() {
  // Join

  const { mutate: joinMutate } = useMutation({
    mutationKey: ['POST', endpoints.member.create],
    mutationFn: fetches.member.create,
  })

  interface JoinCallback extends QueryCallback {
    onPasswordInvalidParameter?: () => void
  }

  const join = (body: CreateMemberRequest, callback?: JoinCallback) => {
    joinMutate(
      { body },
      {
        onSuccess: () => {
          callback?.onSuccess?.()
        },
        onError: (err) => {
          apiErrorHandler(err, {
            onElse: () => {
              toast.error('회원가입에 실패했습니다.')
              callback?.onError?.()
            },
            onCode: {
              [errorCode.auth.join.PASSWORD_INVALID_PARAMETER]: () => {
                toast.error('비밀번호 형식이 올바르지 않습니다.')
                callback?.onPasswordInvalidParameter?.()
              },
            },
          })
        },
      }
    )
  }

  // Check Handle Duplicate

  const { mutate: checkHandleDuplicateMutate } = useMutation({
    mutationKey: ['GET', endpoints.member.checkHandleDuplicate],
    mutationFn: fetches.member.checkHandleDuplicate,
  })

  interface CheckHandleDuplicateCallback extends QueryCallback {
    onInvalidParameter?: () => void
  }

  const checkHandleDuplicate = (handle: string, callback?: CheckHandleDuplicateCallback) => {
    checkHandleDuplicateMutate(
      { handle },
      {
        onSuccess: () => {
          callback?.onSuccess?.()
        },
        onError: (err) => {
          apiErrorHandler(err, {
            onElse: () => {
              toast.error('핸들 중복 체크에 실패했습니다.')
              callback?.onError?.()
            },
            onCode: {
              [errorCode.profile.handle.INVALID_PARAMETER]: () => {
                toast.error('핸들 형식이 올바르지 않습니다.')
                callback?.onInvalidParameter?.()
              },
            },
          })
        },
      }
    )
  }

  // Create Email Auth Code

  const { mutate: createEmailAuthCodeMutate } = useMutation({
    mutationKey: ['POST', endpoints.member.createEmailCode],
    mutationFn: fetches.member.createEmailCode,
  })

  interface CreateEmailAuthCodeCallback extends QueryCallback {
    onEmailDuplicated?: () => void
  }

  const createEmailAuthCode = (
    body: CreateEmailAuthCodeRequest,
    callback?: CreateEmailAuthCodeCallback
  ) => {
    createEmailAuthCodeMutate(
      { body },
      {
        onSuccess: () => {
          callback?.onSuccess?.()
        },
        onError: (err) => {
          apiErrorHandler(err, {
            onElse: () => {
              toast.error('이메일 인증 코드 생성에 실패했습니다.')
              callback?.onError?.()
            },
            onCode: {
              [errorCode.auth.join.EMAIL_DUPLICATED]: () => {
                toast.error('이미 가입된 이메일입니다.')
                callback?.onEmailDuplicated?.()
              },
            },
          })
        },
      }
    )
  }

  // Verify Email Code

  const { mutate: verifyEmailCodeMutate } = useMutation({
    mutationKey: ['POST', endpoints.member.verifyEmailCode],
    mutationFn: fetches.member.verifyEmailCode,
  })

  interface VerifyEmailCodeCallback extends QueryCallback {
    onInvalidParameter?: () => void
  }

  const verifyEmailCode = (
    body: VerifyEmailCodeFetchRequest,
    callback?: VerifyEmailCodeCallback
  ) => {
    verifyEmailCodeMutate(body, {
      onSuccess: () => {
        callback?.onSuccess?.()
      },
      onError: (err) => {
        apiErrorHandler(err, {
          onElse: () => {
            toast.error('이메일 인증 코드가 올바르지 않습니다.')
            callback?.onError?.()
          },
        })
      },
    })
  }

  return { join, checkHandleDuplicate, createEmailAuthCode, verifyEmailCode }
}
