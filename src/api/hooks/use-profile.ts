import { MutateOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { endpoints, fetches } from '@/api'
import { useCallback, useMemo } from 'react'
import { Profile } from '@/entities'
import { UpdateHandleFetchRequest } from '@/api/types'

export function useProfile() {
  const queryClient = useQueryClient()

  const { data: profileData, isLoading } = useQuery({
    queryKey: ['GET', endpoints.member.profile],
    queryFn: fetches.member.profile,
  })

  const { mutate: updateProfile } = useMutation({
    mutationKey: ['PUT', endpoints.member.update],
    mutationFn: fetches.member.update,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['GET', endpoints.member.profile] }),
  })

  const { mutate: updateHandleMutate } = useMutation({
    mutationKey: ['PUT', endpoints.member.updateHandle],
    mutationFn: fetches.member.updateHandle,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['GET', endpoints.member.profile] }),
  })

  const { mutate: updateProfileImage } = useMutation({
    mutationKey: ['PUT', endpoints.member.updateProfileImage],
    mutationFn: fetches.member.updateProfileImage,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['GET', endpoints.member.profile] }),
  })

  const { mutate: checkHandleDuplicateMutate } = useMutation({
    mutationKey: ['GET', endpoints.member.checkHandleDuplicate],
    mutationFn: fetches.member.checkHandleDuplicate,
  })

  const updateHandle = useCallback(
    (handle: string, options?: MutateOptions<void, Error, UpdateHandleFetchRequest, unknown>) => {
      checkHandleDuplicateMutate(
        { handle },
        {
          onSuccess: () => updateHandleMutate({ body: { handle } }, options),
        }
      )
    },
    [checkHandleDuplicateMutate, updateHandleMutate]
  )

  const profile = useMemo<Profile>(() => {
    if (!profileData) {
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

  return { profile, isLoading, updateHandle, updateProfileImage, updateProfile }
}
