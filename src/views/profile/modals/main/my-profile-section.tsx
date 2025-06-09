import { Button } from '@/components/button'
import { Profile } from '@/entities/profile'
import { Banner, Motto, ProfileInfo } from '@/views/profile/components'
import { Divider, Stack } from '@mui/material'

interface MyProfileSectionProps {
  profile: Profile
  onEditMode?: () => void
}

export function MyProfileSection({ profile, onEditMode }: MyProfileSectionProps) {
  return (
    <Stack>
      <Banner src={profile.profileImageUrl} />
      <Divider />
      <Stack p={2} spacing={4}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <ProfileInfo profile={profile} />
          <Button.Plain label="프로필 수정" size="large" sx={{ px: 2 }} onClick={onEditMode} />
        </Stack>
        <Stack
          p={5}
          border={1}
          borderRadius={2}
          borderColor={(theme) => theme.palette.border.light}
          bgcolor={(theme) => theme.palette.background.light}
        >
          <Motto motto={profile.motto} />
        </Stack>
      </Stack>
    </Stack>
  )
}
