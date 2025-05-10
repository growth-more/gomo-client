import { fetches, endpoints } from '@/api'
import { errorCode } from '@/api/error'
import { apiMutate } from '@/api/hooks/api-mutate'
import { QueryCallback } from '@/api/hooks/error-handler'
import { toast } from '@/components/toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface UpdateProfileImageCallback extends QueryCallback {
  onImageTooLarge?: () => void
}

export function useUpdateProfileImage() {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ['PUT', endpoints.member.updateProfileImage],
    mutationFn: fetches.member.updateProfileImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.member.profile] })
    },
  })

  const updateProfileImage = (profileImage: File, callback?: UpdateProfileImageCallback) => {
    apiMutate(
      mutate,
      { body: { profileImage } },
      {
        onSuccess: () => {
          toast.success('프로필 이미지가 변경되었습니다.')
          callback?.onSuccess?.()
        },
        onError: () => {
          callback?.onError?.()
        },
        onCode: {
          [errorCode.profile.image.IMAGE_TOO_LARGE]: () => {
            toast.warning('이미지 크기가 너무 큽니다.')
            callback?.onImageTooLarge?.()
          },
        },
        onElse: () => {
          toast.error('프로필 이미지 변경에 실패했습니다.')
          callback?.onElse?.()
        },
      }
    )
  }

  return { updateProfileImage }
}
