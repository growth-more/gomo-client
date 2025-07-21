import { useGetOneHistory, useProfile, useStreak } from '@/api/hooks'
import { CalendarHeatmap } from '@/components/heatmap'
import { StreakSelector } from '@/components/selector'
import {
  CurrentStreakCard,
  HistoryListItem,
  LongestStreakCard,
  TodayCompletedHistoryCard,
} from '@/views/history/components'
import { Box, CircularProgress, Divider, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { AnimatePresence, motion } from 'motion/react'
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

  const { streak, achievement, achievementLoading } = useStreak(startDate, endDate)
  const { history: selectedHistory, isLoading: selectedLoading } = useGetOneHistory(selectedDate)
  const { history: todayHistory, isLoading: todayLoading } = useGetOneHistory(new Date())
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
        p={1}
        bgcolor={(theme) => theme.palette.background.default}
        borderBottom={1}
        borderColor={(theme) => theme.palette.divider}
        position="sticky"
        top={0}
        zIndex={1}
      >
        <StreakSelector
          value={year}
          onChange={setYear}
          size="small"
          startYear={signUpDateTime.getFullYear()}
          sx={{ width: 100 }}
        />
      </Stack>

      <Stack p={2} spacing={1}>
        <Stack direction="row" gap={1} flexWrap="wrap">
          <CurrentStreakCard
            currentStreakDays={achievement.currentStreakDays}
            isLoading={achievementLoading}
          />
          <LongestStreakCard
            currentStreakDays={achievement.currentStreakDays}
            longestStreakDays={achievement.longestStreakDays}
            isLoading={achievementLoading}
          />
          <TodayCompletedHistoryCard
            completedCount={todayHistory.length}
            isLoading={todayLoading}
          />
        </Stack>
        <Box
          ref={streakRef}
          p={2}
          border={1}
          borderRadius={1}
          borderColor={(theme) => theme.palette.border.main}
          bgcolor={(theme) => theme.palette.background.light}
        >
          <CalendarHeatmap
            data={streak.daily}
            endDate={endDate}
            type="DAILY"
            selectedDate={selectedDate}
            onSelect={setSelectedDate}
          />
        </Box>

        <AnimatePresence>
          {!!selectedDate && (
            <Stack
              p={1}
              spacing={1}
              border={1}
              borderRadius={1}
              borderColor={(theme) => theme.palette.border.main}
              bgcolor={(theme) => theme.palette.background.light}
              component={motion.div}
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              overflow="hidden"
            >
              <Typography fontSize={18} fontWeight={600} color="primary" px={1} py={0.5}>
                {dayjs(selectedDate).format('YYYY년 MM월 DD일')}
              </Typography>
              <Divider />
              <Stack>
                {selectedLoading && (
                  <Stack alignItems="center" justifyContent="center" p={1} minHeight={150}>
                    <CircularProgress />
                  </Stack>
                )}
                {selectedHistory.map((history) => (
                  <HistoryListItem
                    key={history.id}
                    content={history.content}
                    date={history.completedDateTime}
                    questType={history.questType}
                    interestName={history.subjectName}
                  />
                ))}
              </Stack>
            </Stack>
          )}
        </AnimatePresence>
      </Stack>
    </Stack>
  )
}
