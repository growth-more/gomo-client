import { StreakCard } from '@/views/history/components/streak-card/streak-card'
import { Typography } from '@mui/material'

interface LongestStreakCardProps {
  currentStreakDays?: number
  longestStreakDays?: number
  isLoading: boolean
}

export function LongestStreakCard({
  currentStreakDays,
  longestStreakDays,
  isLoading,
}: LongestStreakCardProps) {
  return (
    <StreakCard isLoading={isLoading}>
      <Typography fontSize={12} fontWeight={400} color="text.secondary">
        최장
      </Typography>
      <Typography fontSize={26} fontWeight={600} color="primary">
        {longestStreakDays}일
      </Typography>
      <Typography fontSize={12} fontWeight={400} color="text.secondary">
        {!!longestStreakDays && currentStreakDays === longestStreakDays
          ? '연속 퀘스트 기록 진행중'
          : '연속 퀘스트 완료'}
      </Typography>
    </StreakCard>
  )
}
