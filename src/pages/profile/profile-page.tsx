import { Stack } from '@mui/material'
import { ScrollContainer } from '@/components/scrollbar'
import { HeaderSection, MajorInterestSection, StreakSection } from '@/pages/profile/components'

export function ProfilePage() {
  return (
    <Stack height={1}>
      <ScrollContainer sx={{ overflowX: 'hidden' }}>
        <HeaderSection />
        <MajorInterestSection />
        <StreakSection />
      </ScrollContainer>
    </Stack>
  )
}
