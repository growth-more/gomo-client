import { useProfile, useStreak } from '@/api/hooks'
import { CalendarHeatmap } from '@/components/heatmap'
import { StreakSelector } from '@/components/selector'
import { Box, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useEffect, useMemo, useRef, useState } from 'react'

export function HistoryStreakSection() {
  const [year, setYear] = useState<number>(-1)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const streakRef = useRef<HTMLDivElement>(null)

  const endDate = useMemo(() => {
    if (year === -1) {
      return dayjs().startOf('day').toDate()
    }
    return dayjs().year(year).endOf('year').endOf('day').toDate()
  }, [year])

  const startDate = useMemo(() => {
    return dayjs(endDate).subtract(1, 'year').startOf('day').toDate()
  }, [endDate])

  const { streak } = useStreak(startDate, endDate)
  const {
    profile: { signUpDateTime },
  } = useProfile()

  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      if (selectedDate !== null && !streakRef.current?.contains(e.target as Node)) {
        setSelectedDate(null)
      }
    }
    window.addEventListener('click', clickHandler)
    return () => window.removeEventListener('click', clickHandler)
  }, [selectedDate])

  return (
    <Stack>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        bgcolor={(theme) => theme.palette.background.default}
        p={1}
        borderBottom={1}
        borderColor={(theme) => theme.palette.divider}
      >
        <StreakSelector
          value={year}
          onChange={setYear}
          size="small"
          startYear={signUpDateTime.getFullYear()}
          sx={{ width: 100 }}
        />
      </Stack>
      <Box p={2} ref={streakRef}>
        <CalendarHeatmap
          data={streak.daily}
          endDate={endDate}
          type="DAILY"
          selectedDate={selectedDate}
          onSelect={setSelectedDate}
        />
      </Box>
      {!!selectedDate && (
        <Stack px={2}>
          <Typography fontSize={20} fontWeight={700} color="primary">
            {dayjs(selectedDate).format('YYYY년 MM월 DD일')}
          </Typography>
        </Stack>
      )}
    </Stack>
  )
}
