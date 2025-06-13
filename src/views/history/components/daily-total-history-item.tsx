import { Iconify } from '@/components/iconify'
import { Box, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'

interface DailyTotalHistoryItemProps {
  date: Date
  dailyCount: number
  weeklyCount: number
  monthlyCount: number
}

export function DailyTotalHistoryItem({
  date,
  dailyCount,
  weeklyCount,
  monthlyCount,
}: DailyTotalHistoryItemProps) {
  return (
    <Stack
      p={1}
      spacing={0.5}
      borderRadius={1}
      sx={{ '&:hover': { bgcolor: (theme) => theme.palette.background.main }, cursor: 'pointer' }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <Iconify icon="material-symbols:commit" />
        <Typography fontSize={15} fontWeight={500}>
          {dayjs(date).format('YYYY년 MM월 DD일')}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Box width={20} />
        <Stack direction="row" alignItems="center" divider={<Iconify icon="mdi:dot" width={15} />}>
          {dailyCount > 0 && <Typography variant="caption">일일퀘스트 {dailyCount}개</Typography>}
          {weeklyCount > 0 && <Typography variant="caption">주간퀘스트 {weeklyCount}개</Typography>}
          {monthlyCount > 0 && (
            <Typography variant="caption">월간퀘스트 {monthlyCount}개</Typography>
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}
