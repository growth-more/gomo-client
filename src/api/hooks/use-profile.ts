import { useQuery } from '@tanstack/react-query'
import { endpoints, fetches } from '@/api'
import { useMemo } from 'react'
import { Profile } from '@/entities'

export function useProfile() {
  const { data: profileData, isLoading } = useQuery({
    queryKey: ['GET', endpoints.member.profile],
    queryFn: fetches.member.profile,
  })

  const profile = useMemo<Profile | null>(() => {
    if (!profileData) {
      return null
    }
    return {
      id: profileData.id,
      email: profileData.email,
      handle: profileData.handle,
      name: profileData.name,
      motto: profileData.motto,
      availablePoint: profileData.availablePoints,
      profileImageUrl: profileData.profileImageUrl,
      subscriptionPlan: profileData.subscriptionPlan,
    }
  }, [profileData])

  return { profile, isLoading }
}
