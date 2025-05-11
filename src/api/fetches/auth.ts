import { LoginRequest, LoginResponse, ReissueResponse } from '@/api/types'
import { endpoints, axiosFetch } from '@/api'
import { apiErrorCode, errorCode } from '@/api/error'
import { authCode } from '@/api/error/code/auth'

export const auth = {
  login: async (request: LoginRequest): Promise<LoginResponse> => {
    return axiosFetch.post(endpoints.auth.login, request, {
      onCode: {
        [apiErrorCode.NOT_FOUND]: errorCode.auth.login.NOT_FOUND,
      },
    })
  },

  reissue: async (): Promise<ReissueResponse> => {
    return axiosFetch.post(endpoints.auth.reissue)
  },

  logout: async (): Promise<void> => {
    return axiosFetch.get(endpoints.auth.logout)
  },

  check: async (): Promise<boolean> => {
    return axiosFetch.get(endpoints.auth.check, {
      onSuccess: () => true,
      on401: authCode.NOT_AUTHENTICATED,
    })
  },
}
