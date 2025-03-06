import { Stack } from '@mui/material'
import { ScrollContainer } from '@/components/scrollbar'
import { ProfileHeader, Streak } from '@/pages/profile/components'

export function ProfilePage() {
  return (
    <Stack height={1}>
      <ScrollContainer sx={{ overflowX: 'hidden' }}>
        <ProfileHeader />
        <Streak />
      </ScrollContainer>
    </Stack>
  )
}
