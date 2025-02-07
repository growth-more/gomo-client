import { LoginMemberRequest } from '@/api/types'
import { AXIOS, endpoints } from '@/api'

const login = async (request: LoginMemberRequest) => {
  const response = await AXIOS.post(endpoints.member.login, request)
  return response.data
}

export const member = {
  login,
}
