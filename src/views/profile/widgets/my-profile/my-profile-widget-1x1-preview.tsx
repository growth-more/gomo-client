import { Widget } from '@/components/widget'
import { Motto, ProfileInfo } from '@/views/profile/components'
import { Divider, Stack } from '@mui/material'
import { useProfile } from '@/api/hooks'

export function MyProfileWidget1x1Preview() {
  const { profile } = useProfile()

  return (
    <Widget width={1} disableTitle sx={{ p: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Stack
        spacing={2}
        p={1}
        sx={{ '&:hover': { bgcolor: (theme) => theme.palette.background.main }, cursor: 'pointer' }}
        borderRadius={1}
      >
        <ProfileInfo profile={profile} />
        <Motto motto={profile.motto} />
      </Stack>
      <Divider />
    </Widget>
  )
}
