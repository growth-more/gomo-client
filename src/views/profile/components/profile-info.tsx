import { Profile } from '@/entities/profile'
import { Avatar } from '@/views/profile/components/avatar'
import { Stack, Typography } from '@mui/material'

interface ProfileInfoProps {
  profile: Profile
}

export function ProfileInfo({ profile }: ProfileInfoProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Avatar src={profile.profileImageUrl} />
      <Stack>
        <Typography fontSize={18} fontWeight={600}>
          {profile.name}
        </Typography>
        <Typography fontSize={13} color="textDisabled">
          {profile.handle}
        </Typography>
      </Stack>
    </Stack>
  )
}
