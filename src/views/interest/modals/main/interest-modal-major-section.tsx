import { useGetMajorInterest } from '@/api/hooks'
import { MajorInterestItem } from '@/views/interest/components/major-interest/major-interest-item'
import { Box, Stack, Typography } from '@mui/material'

export function InterestModalMajorSection() {
  const { majorInterest } = useGetMajorInterest()

  return (
    <Stack width={1} height={1} p={2} spacing={2}>
      <InterestModalMajorSectionTitle count={majorInterest.length} />
      <Box display="flex" flexWrap="wrap" gap={1} width={1}>
        {majorInterest.map((interest, i) => (
          <MajorInterestItem key={i} majorInterest={interest} />
        ))}
      </Box>
    </Stack>
  )
}

interface InterestModalMajorSectionTitleProps {
  count: number
}

function InterestModalMajorSectionTitle({ count }: InterestModalMajorSectionTitleProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Typography fontSize={15} fontWeight={600}>
        나의 주요 관심사
      </Typography>
      <Typography
        fontSize={18}
        fontWeight={600}
        sx={{ color: (theme) => theme.palette.primary.main }}
      >
        {count}개
      </Typography>
    </Stack>
  )
}
