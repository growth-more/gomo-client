import { LoginMemberRequest } from '@/api/types'
import { uri, AXIOS } from '@/api'

const login = async (request: LoginMemberRequest) => {
  const response = await AXIOS.post(uri.member.login, request)
  return response.data
}

export const member = {
  login,
}
