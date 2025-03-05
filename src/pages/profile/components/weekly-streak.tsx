import { useStreak } from '@/api/hooks'
import { CalendarHeatmap } from '@/components/heatmap'
import { StreakDateSelector } from '@/pages/profile/components/streak-date-selector'
import { alpha, Divider, Stack } from '@mui/material'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'

export function WeeklyStreak() {
  const [endDate, setEndDate] = useState(new Date())

  const startDate = useMemo(() => {
    return dayjs(endDate).subtract(1, 'year').startOf('day').toDate()
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
        data={streak.weekly}
        endDate={endDate}
        sx={{ flex: 1, overflow: 'hidden', p: 1, alignSelf: 'center' }}
        color="#00a63e"
        type="WEEKLY"
      />
      <Divider orientation="vertical" />
      <StreakDateSelector value={endDate} onChange={setEndDate} sx={{ width: 80, p: 0.5 }} />
    </Stack>
  )
}
