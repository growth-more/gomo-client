import { Iconify } from '@/components/iconify'
import { StreakCard } from '@/views/history/components/streak-card/streak-card'
import { Stack, Typography } from '@mui/material'

interface TodayCompletedHistoryCardProps {
  completedCount: number
  isLoading: boolean
}

export function TodayCompletedHistoryCard({
  completedCount,
  isLoading,
}: TodayCompletedHistoryCardProps) {
  return (
    <StreakCard isLoading={isLoading}>
      {completedCount > 0 ? (
        <>
          <Typography fontSize={12} fontWeight={400} color="text.secondary">
            오늘
          </Typography>
          <Typography fontSize={26} fontWeight={600} color="primary">
            {completedCount}개
          </Typography>
          <Typography fontSize={12} fontWeight={400} color="text.secondary">
            퀘스트 완료
          </Typography>
        </>
      ) : (
        <Stack spacing={1}>
          <Iconify
            icon="la:surprise"
            width={35}
            sx={{ color: (theme) => theme.palette.text.secondary }}
          />
          <Typography fontSize={12} fontWeight={400} color="text.secondary">
            오늘은 아직 완료한 퀘스트가 없어요.
          </Typography>
        </Stack>
      )}
    </StreakCard>
  )
}
