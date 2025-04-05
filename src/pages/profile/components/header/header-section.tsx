import { useProfile } from '@/api/hooks'
import { Editable } from '@/components/editable'
import { OnEditHandler } from '@/components/editable/types'
import { ProfileHandle, ProfileMotto, ProfileName } from '@/pages/profile/components'
import { Stack } from '@mui/material'

export function HeaderSection() {
  const { profile, updateHandle, updateProfileMotto, updateProfileName, updateProfileImage } =
    useProfile()

  const updateNameHandler = (name: string, handler?: OnEditHandler) => {
    updateProfileName(name, handler)
  }

  const updateMottoHandler = (motto: string, handler?: OnEditHandler) => {
    updateProfileMotto(motto, handler)
  }

  const updateHandleHandler = (handle: string, handler?: OnEditHandler) => {
    updateHandle(handle, handler)
  }

  const updateProfileImageHandler = (image: File | null) => {
    if (image !== null) {
      updateProfileImage({ profileImage: image })
      return
    }
    // deleteProfileImage()
  }

  return (
    <Stack p={1}>
      <Editable.Banner />
      <Stack alignItems="center" spacing={1} sx={{ translate: '0 -35px' }}>
        <Editable.Avatar img={profile.profileImageUrl} onEdit={updateProfileImageHandler} />
        <Stack alignItems="center" spacing={0.5} width={1}>
          <ProfileName name={profile.name} onEdit={updateNameHandler} />
          <ProfileHandle handle={profile.handle} onEdit={updateHandleHandler} />
        </Stack>
        <ProfileMotto motto={profile.motto} onEdit={updateMottoHandler} />
      </Stack>
    </Stack>
  )
}
