import { useStreak } from '@/api/hooks'
import { CalendarHeatmap } from '@/components/heatmap'
import { StreakType } from '@/entities'
import { StreakDateSelector, StreakTypeSelector } from '@/pages/profile/components'
import { alpha, Divider, Stack } from '@mui/material'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'

export function Streak() {
  const [streakType, setStreakType] = useState<StreakType>('ALL')
  const [endDate, setEndDate] = useState(new Date())

  const startDate = useMemo(() => {
    return dayjs(endDate).subtract(1, 'year').startOf('day').toDate()
  }, [endDate])

  const { streak } = useStreak(startDate, endDate)

  const data = useMemo(() => {
    if (streakType === 'DAILY') {
      return streak.daily
    }
    if (streakType === 'WEEKLY') {
      return streak.weekly
    }
    if (streakType === 'MONTHLY') {
      return streak.monthly
    }
    return streak.all
  }, [streak, streakType])

  const type = useMemo(() => {
    if (streakType === 'ALL') {
      return 'DAILY'
    }
    return streakType
  }, [streakType])

  return (
    <Stack
      direction="row"
      bgcolor={(theme) => alpha(theme.palette.common.white, 0.2)}
      border={1}
      borderColor="divider"
      borderRadius={2}
      overflow="hidden"
      height={150}
    >
      <StreakTypeSelector value={streakType} onChange={setStreakType} sx={{ width: 80, p: 0.5 }} />
      <Divider orientation="vertical" />

      <CalendarHeatmap
        data={data}
        endDate={endDate}
        sx={{ flex: 1, overflow: 'hidden', p: 1, alignSelf: 'center' }}
        color="#00a63e"
        type={type}
      />

      <Divider orientation="vertical" />
      <StreakDateSelector value={endDate} onChange={setEndDate} sx={{ width: 80, p: 0.5 }} />
    </Stack>
  )
}
