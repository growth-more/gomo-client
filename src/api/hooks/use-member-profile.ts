import { useQuery } from '@tanstack/react-query'
import { endpoints, fetches } from '@/api'

export function useMemberProfile() {
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['GET', endpoints.member.profile],
    queryFn: fetches.member.profile,
  })

  return { profile, profileLoading }
}
