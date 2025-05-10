import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { endpoints, fetches } from '@/api'
import { useMemo } from 'react'
import { Profile } from '@/entities'
import { UpdateProfileImageRequest } from '@/api/types'
import { apiErrorHandler, QueryCallback } from '@/api/hooks/error-handler'
import { errorCode } from '@/api/error'
import { toast } from '@/components/toast'

export function useProfile() {
  const queryClient = useQueryClient()

  // Get Profile

  const { data: profileData, isLoading } = useQuery({
    queryKey: ['GET', endpoints.member.profile],
    queryFn: fetches.member.profile,
  })

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

  // Update Profile

  const { mutate: updateProfileMutate } = useMutation({
    mutationKey: ['PUT', endpoints.member.update],
    mutationFn: fetches.member.update,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['GET', endpoints.member.profile] }),
  })

  interface UpdateProfileNameCallback extends QueryCallback {
    onInvalidParameter?: () => void
  }

  const updateProfileName = (name: string, callback?: UpdateProfileNameCallback) => {
    updateProfileMutate(
      { body: { motto: profile.motto, name } },
      {
        onSuccess: () => {
          toast.success('이름이 변경되었습니다.')
          callback?.onSuccess?.()
        },
        onError: (err) => {
          apiErrorHandler(err, {
            onElse: () => {
              toast.error('이름 변경에 실패했습니다.')
              callback?.onError?.()
            },
            onCode: {
              [errorCode.profile.motto.INVALID_PARAMETER]: () => {
                toast.warning('사용할 수 없는 단어가 사용되었습니다.')
                callback?.onInvalidParameter?.()
              },
            },
          })
        },
      }
    )
  }

  interface UpdateProfileMottoCallback extends QueryCallback {
    onInvalidParameter?: () => void
  }

  const updateProfileMotto = (motto: string, callback?: UpdateProfileMottoCallback) => {
    updateProfileMutate(
      { body: { name: profile.name, motto } },
      {
        onSuccess: () => {
          toast.success('모토가 변경되었습니다.')
          callback?.onSuccess?.()
        },
        onError: (err) => {
          apiErrorHandler(err, {
            onElse: () => {
              toast.error('모토 변경에 실패했습니다.')
              callback?.onError?.()
            },
            onCode: {
              [errorCode.profile.motto.INVALID_PARAMETER]: () => {
                toast.warning('사용할 수 없는 단어가 사용되었습니다.')
                callback?.onInvalidParameter?.()
              },
            },
          })
        },
      }
    )
  }

  // Update Profile Image

  const { mutate: updateProfileImageMutate } = useMutation({
    mutationKey: ['PUT', endpoints.member.updateProfileImage],
    mutationFn: fetches.member.updateProfileImage,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['GET', endpoints.member.profile] }),
  })

  interface UpdateProfileImageCallback extends QueryCallback {
    onImageTooLarge?: () => void
  }

  const updateProfileImage = (
    body: UpdateProfileImageRequest,
    callback?: UpdateProfileImageCallback
  ) => {
    updateProfileImageMutate(
      { body },
      {
        onSuccess: () => {
          toast.success('프로필 이미지가 변경되었습니다.')
          callback?.onSuccess?.()
        },
        onError: (err) => {
          apiErrorHandler(err, {
            onElse: () => {
              toast.error('프로필 이미지 변경에 실패했습니다.')
              callback?.onError?.()
            },
            onCode: {
              [errorCode.profile.image.IMAGE_TOO_LARGE]: () => {
                toast.warning('이미지 크기가 너무 큽니다.')
                callback?.onImageTooLarge?.()
              },
            },
          })
        },
      }
    )
  }

  // Update Handle

  const { mutate: updateHandleMutate } = useMutation({
    mutationKey: ['PUT', endpoints.member.updateHandle],
    mutationFn: fetches.member.updateHandle,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['GET', endpoints.member.profile] }),
  })

  const { mutate: checkHandleDuplicateMutate } = useMutation({
    mutationKey: ['GET', endpoints.member.checkHandleDuplicate],
    mutationFn: fetches.member.checkHandleDuplicate,
  })

  interface UpdateHandleCallback extends QueryCallback {
    onDuplicated?: () => void
    onInvalidParameter?: () => void
  }

  const updateHandle = (handle: string, callback?: UpdateHandleCallback) => {
    checkHandleDuplicateMutate(
      { handle },
      {
        onSuccess: () => {
          updateHandleMutate(
            { body: { handle } },
            {
              onSuccess: () => {
                toast.success('핸들이 변경되었습니다.')
                callback?.onSuccess?.()
              },
              onError: (err) => {
                apiErrorHandler(err, {
                  onElse: () => {
                    toast.error('핸들 변경에 실패했습니다.')
                    callback?.onError?.()
                  },
                })
              },
            }
          )
        },
        onError: (err) => {
          apiErrorHandler(err, {
            onElse: () => {
              toast.error('핸들 변경에 실패했습니다.')
              callback?.onError?.()
            },
            onCode: {
              [errorCode.profile.handle.DUPLICATED]: () => {
                toast.warning('이미 사용중인 핸들입니다.')
                callback?.onDuplicated?.()
              },
              [errorCode.profile.handle.INVALID_PARAMETER]: () => {
                toast.warning('사용할 수 없는 단어가 사용되었습니다.')
                callback?.onInvalidParameter?.()
              },
            },
          })
        },
      }
    )
  }

  return {
    profile,
    isLoading,
    updateHandle,
    updateProfileImage,
    updateProfileName,
    updateProfileMotto,
  }
}
