import { useMutation, useQuery } from '@tanstack/react-query'
import { endpoints, fetches } from '@/api'
import { useMemo } from 'react'
import { Profile } from '@/entities'

export function useProfile() {
  const { data: profileData, isLoading } = useQuery({
    queryKey: ['GET', endpoints.member.profile],
    queryFn: fetches.member.profile,
  })

  const { mutate: updateProfile } = useMutation({
    mutationKey: ['PUT', endpoints.member.update],
    mutationFn: fetches.member.update,
  })

  const { mutate: updateHandle } = useMutation({
    mutationKey: ['PUT', endpoints.member.updateHandle],
    mutationFn: fetches.member.updateHandle,
  })

  const { mutate: updateProfileImage } = useMutation({
    mutationKey: ['PUT', endpoints.member.updateProfileImage],
    mutationFn: fetches.member.updateProfileImage,
  })

  const { mutate: checkHandleDuplicate } = useMutation({
    mutationKey: ['GET', endpoints.member.checkHandleDuplicate],
    mutationFn: fetches.member.checkHandleDuplicate,
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
