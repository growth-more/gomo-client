import { fetches } from '@/api'
import { errorCode } from '@/api/error'
import { QueryCallback, apiErrorHandler } from '@/api/hooks/error-handler'
import { LoginRequest } from '@/api/types'
import { toast } from '@/components/toast'
import { useAuthStore, useTokenStore } from '@/stores'
import { useMutation } from '@tanstack/react-query'
import { useMemo } from 'react'

export type AuthenticateStatus = 'LOADING' | 'AUTHENTICATED' | 'UNAUTHENTICATED'

export function useAuth() {
  const { auth, isLoading } = useAuthStore()
  const { setAccessToken, clearAccessToken } = useTokenStore()

  const { mutate: loginMutate } = useMutation({
    mutationFn: fetches.auth.login,
    onSuccess: (data) => {
      setAccessToken(data.accessToken)
    },
  })

  interface LoginCallback extends QueryCallback {
    onNotFound?: () => void
  }

  const login = (body: LoginRequest, callback?: LoginCallback) => {
    loginMutate(body, {
      onSuccess: () => {
        callback?.onSuccess?.()
      },
      onError: (err) => {
        apiErrorHandler(err, {
          onElse: () => {
            callback?.onError?.()
          },
          onCode: {
            [errorCode.auth.login.NOT_FOUND]: () => {
              toast.error('잘못된 아이디 또는 비밀번호입니다.')
              callback?.onNotFound?.()
            },
          },
        })
      },
    })
  }

  const { mutate: logout } = useMutation({
    mutationFn: fetches.auth.logout,
    onSuccess: () => {
      clearAccessToken()
    },
  })

  const isLogin = useMemo<AuthenticateStatus>(() => {
    if (isLoading) {
      return 'LOADING'
    }
    if (auth === null) {
      return 'UNAUTHENTICATED'
    }
    return 'AUTHENTICATED'
  }, [auth, isLoading])

  return { isLogin, login, logout }
}
