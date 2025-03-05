import { useStreak } from '@/api/hooks'
import { CalendarHeatmap } from '@/components/heatmap'
import { StreakSelector } from '@/pages/profile/components/streak-selector'
import { alpha, Divider, Stack } from '@mui/material'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'

export function DailyStreak() {
  const [endDate, setEndDate] = useState(new Date())

  const startDate = useMemo(() => {
    return dayjs(endDate).subtract(1, 'year').toDate()
  }, [endDate])

  const { streak } = useStreak(startDate, endDate)

  return (
    <Stack
      direction="row"
      bgcolor={(theme) => alpha(theme.palette.common.white, 0.2)}
      borderRadius={2}
      overflow="hidden"
      height={150}
    >
      <CalendarHeatmap
        data={streak.daily}
        endDate={endDate}
        sx={{ flex: 1, overflow: 'hidden', p: 1, alignSelf: 'center' }}
        color="#00a63e"
      />
      <Divider orientation="vertical" />
      <StreakSelector value={endDate} onChange={setEndDate} sx={{ width: 80, p: 0.5 }} />
    </Stack>
  )
}
