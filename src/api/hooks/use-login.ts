import { useMutation } from '@tanstack/react-query'
import { LoginMemberRequest } from '@/api/types'
import { member } from '@/api/fetchs'

export function useLogin() {
  const { mutate: login, ...others } = useMutation({
    mutationFn: (request: LoginMemberRequest) => member.login(request),
  })

  return { login, ...others }
}
