import { fetches } from '@/api'
import { endpoints } from '@/api'
import { Profile } from '@/entities/profile'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useGetProfile() {
  const { data, isLoading } = useQuery({
    queryKey: ['GET', endpoints.member.profile],
    queryFn: fetches.member.profile,
  })

  const profile = useMemo<Profile>(() => {
    if (!data) {
      return {
        id: '',
        email: '',
        handle: '',
        name: '',
        motto: '',
        availablePoint: 0,
        profileImageUrl: '',
        subscriptionPlan: '',
      }
    }
    return {
      id: data.id,
      email: data.email,
      handle: data.handle,
      name: data.name,
      motto: data.motto,
      availablePoint: data.availablePoints,
      profileImageUrl: data.profileImageUrl,
      subscriptionPlan: data.subscriptionPlan,
    }
  }, [data])

  return { profile, isLoading }
}
