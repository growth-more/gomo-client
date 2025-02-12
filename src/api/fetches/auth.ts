import { LoginRequest, LoginResponse, ReissueResponse } from '@/api/types'
import { AXIOS, endpoints, axiosStatus } from '@/api'

export const auth = {
  login: async (request: LoginRequest): Promise<LoginResponse> => {
    return axiosStatus(() => AXIOS.post<LoginResponse>(endpoints.auth.login, request), {
      onSuccess: (data) => data,
    })
  },

  reissue: async (): Promise<ReissueResponse> => {
    return axiosStatus(() => AXIOS.get<ReissueResponse>(endpoints.auth.reissue), {
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
      on401: () => false,
    })
  },
}
