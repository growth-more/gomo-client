import { LoginRequest, LoginResponse, ReissueResponse } from '@/api/types'
import { AXIOS, endpoints, axiosStatus } from '@/api'
import { ApiError, apiErrorCode, errorCode } from '@/api/error'
import { authCode } from '@/api/error/code/auth'

export const auth = {
  login: async (request: LoginRequest): Promise<LoginResponse> => {
    return axiosStatus(() => AXIOS.post<LoginResponse>(endpoints.auth.login, request), {
      onSuccess: (data) => data,
      onCode: {
        [apiErrorCode.NOT_FOUND]: () => new ApiError(errorCode.auth.login.NOT_FOUND),
      },
    })
  },

  reissue: async (): Promise<ReissueResponse> => {
    return axiosStatus(() => AXIOS.post<ReissueResponse>(endpoints.auth.reissue), {
      onSuccess: (data) => data,
    })
  },

  logout: async (): Promise<void> => {
    return axiosStatus(() => AXIOS.get<void>(endpoints.auth.logout), {
      onSuccess: (data) => data,
    })
  },

  check: async (): Promise<boolean> => {
    return axiosStatus(() => AXIOS.get<void>(endpoints.auth.check), {
      onSuccess: () => true,
      on401: () => new ApiError(authCode.NOT_AUTHENTICATED),
    })
  },
}
