import { useCheckAuthCode } from './use-check-auth-code'
import { useCheckHandleDuplicate } from './use-check-handle-duplicate'
import { useCreateAuthCode } from './use-create-auth-code'
import { useCreateMember } from './use-create-member'

export * from './use-check-auth-code'
export * from './use-check-handle-duplicate'
export * from './use-create-auth-code'
export * from './use-create-member'

export function useJoin() {
  const { join } = useCreateMember()
  const { checkHandleDuplicate } = useCheckHandleDuplicate()
  const { createAuthCode } = useCreateAuthCode()
  const { checkAuthCode } = useCheckAuthCode()

  return { join, checkHandleDuplicate, createAuthCode, checkAuthCode }
}

import { useGetProfile } from './use-get-profile'
import { useUpdateHandle } from './use-update-handle'
import { useUpdateMotto } from './use-update-motto'
import { useUpdateName } from './use-update-name'
import { useUpdateProfileImage } from './use-update-profile-image'

export * from './use-get-profile'
export * from './use-update-handle'
export * from './use-update-motto'
export * from './use-update-name'
export * from './use-update-profile-image'

export function useProfile() {
  const { profile, isLoading } = useGetProfile()
  const { updateHandle } = useUpdateHandle()
  const { updateMotto } = useUpdateMotto()
  const { updateName } = useUpdateName()
  const { updateProfileImage } = useUpdateProfileImage()

  return { profile, isLoading, updateHandle, updateMotto, updateName, updateProfileImage }
}

export * from './use-update-widget'
