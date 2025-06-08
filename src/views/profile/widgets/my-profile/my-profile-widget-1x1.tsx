import { Widget } from '@/components/widget'
import { useGetProfile } from '@/api/hooks/member/use-get-profile'
import { Avatar, Motto } from '@/views/profile/components'
import { Divider, Stack, Typography } from '@mui/material'

export function MyProfileWidget1x1() {
  const { profile } = useGetProfile()

  return (
    <Widget width={1} disableTitle sx={{ p: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Stack
        spacing={2}
        p={1}
        sx={{ '&:hover': { bgcolor: (theme) => theme.palette.background.main }, cursor: 'pointer' }}
        borderRadius={1}
      >
        <Stack direction="row" alignItems="center" spacing={3}>
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
        <Motto motto={profile.motto} />
      </Stack>
      <Divider />
    </Widget>
  )
}
