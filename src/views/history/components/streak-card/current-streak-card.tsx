import { StreakCard } from '@/views/history/components/streak-card/streak-card'
import { Typography } from '@mui/material'

interface CurrentStreakCardProps {
  currentStreakDays?: number
  isLoading: boolean
}

export function CurrentStreakCard({ currentStreakDays, isLoading }: CurrentStreakCardProps) {
  return (
    <StreakCard isLoading={isLoading}>
      <Typography fontSize={12} fontWeight={400} color="text.secondary">
        현재
      </Typography>
      <Typography fontSize={26} fontWeight={600} color="primary">
        {currentStreakDays}일
      </Typography>
      <Typography fontSize={12} fontWeight={400} color="text.secondary">
        연속 퀘스트 진행중
      </Typography>
    </StreakCard>
  )
}
