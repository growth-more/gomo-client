import { useMutation } from '@tanstack/react-query'
import { LoginMemberRequest } from '@/api/types'
import { fetches } from '@/api/fetches'

export function useLogin() {
  const { mutate: login, ...others } = useMutation({
    mutationFn: (request: LoginMemberRequest) => fetches.member.login(request),
  })

  return { login, ...others }
}
