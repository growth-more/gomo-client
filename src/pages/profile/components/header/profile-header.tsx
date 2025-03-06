import { useProfile } from '@/api/hooks'
import { Editable } from '@/components/editable'
import { ProfileHandle, ProfileMotto, ProfileName } from '@/pages/profile/components'
import { Stack } from '@mui/material'

export function ProfileHeader() {
  const { profile, updateHandle, updateProfile, updateProfileImage } = useProfile()

  const updateNameHandler = (name: string) => {
    updateProfile(name, profile.motto)
  }

  const updateMottoHandler = (motto: string) => {
    updateProfile(profile.name, motto)
  }

  const updateHandleHandler = (handle: string) => {
    updateHandle(handle)
  }

  const updateProfileImageHandler = (image: File | null) => {
    if (image !== null) {
      updateProfileImage(image)
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
