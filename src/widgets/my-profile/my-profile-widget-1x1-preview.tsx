import { WidgetBasic } from '@/components/widget'
import { Motto, ProfileInfo } from '@/views/profile/components'
import { Divider, Stack } from '@mui/material'
import { Profile } from '@/entities/profile'

const profile: Profile = {
  id: 'a10581ce-d721-11ef-a8a5-2508e2a6438b',
  email: 'gomo@gomo.com',
  handle: '',
  name: 'GOMO',
  motto: 'GOMO와 함꼐 성장하자!',
  availablePoints: 0,
  profileImageUrl: '',
  profileBannerUrl: '',
  subscriptionPlan: '',
  signUpDateTime: new Date(),
  loginProvider: 'EMAIL',
}

export function MyProfileWidget1x1Preview() {
  return (
    <WidgetBasic
      width={1}
      disableTitle
      sx={{ p: 1, display: 'flex', flexDirection: 'column', gap: 1 }}
    >
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
    </WidgetBasic>
  )
}
