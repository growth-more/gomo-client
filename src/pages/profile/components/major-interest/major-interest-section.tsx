import { useMajorInterest } from '@/api/hooks'
import { ScrollContainer } from '@/components/scrollbar'
import { MajorInterestItem } from '@/pages/profile/components'
import { Stack } from '@mui/material'

export function MajorInterestSection() {
  const { majorInterest } = useMajorInterest()

  return (
    <Stack p={1}>
      <ScrollContainer>
        <Stack direction="row" p={1} spacing={1} justifyContent="center" alignItems="center">
          {majorInterest.map((interest) => (
            <MajorInterestItem key={interest.id} interest={interest} />
          ))}
        </Stack>
      </ScrollContainer>
    </Stack>
  )
}
