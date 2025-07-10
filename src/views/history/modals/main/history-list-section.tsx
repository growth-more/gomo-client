import { useHistory, useProfile } from '@/api/hooks'
import { MonthSelector, YearSelector } from '@/components/selector'
import { HistoryListEmpty, HistoryListItem } from '@/views/history/components'
import { CircularProgress, Divider, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'

export function HistoryListSection() {
  const now = useMemo(() => new Date(), [])

  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth() + 1)

  const { history, isLoading } = useHistory(year, month)
  const {
    profile: { signUpDateTime },
  } = useProfile()

  const startMonth = useMemo(() => {
    if (year !== signUpDateTime.getFullYear()) {
      return 1
    }
    return signUpDateTime.getMonth() + 1
  }, [year, signUpDateTime])

  const endMonth = useMemo(() => {
    if (year !== now.getFullYear()) {
      return 12
    }
    return now.getMonth() + 1
  }, [year, now])

  return (
    <Stack minHeight={1}>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        position="sticky"
        top={0}
        bgcolor={(theme) => theme.palette.background.default}
        p={1}
        borderBottom={1}
        borderColor={(theme) => theme.palette.divider}
      >
        <YearSelector
          value={year}
          onChange={setYear}
          size="small"
          startYear={signUpDateTime.getFullYear()}
        />
        <MonthSelector
          value={month}
          onChange={setMonth}
          size="small"
          startMonth={startMonth}
          endMonth={endMonth}
        />
      </Stack>
      <Stack spacing={2} p={2} divider={<Divider />} flex={1}>
        {isLoading && (
          <Stack alignItems="center" justifyContent="center" flex={1}>
            <CircularProgress />
          </Stack>
        )}
        {history.length === 0 && !isLoading && <HistoryListEmpty />}
        {history.map((e) => (
          <Stack key={e.date.getTime()} spacing={1}>
            <Typography fontSize={18} fontWeight={600} pl={1} color="primary">
              {dayjs(e.date).format('MM월 DD일')}
            </Typography>
            <Stack>
              {e.history.map((history) => (
                <HistoryListItem
                  key={history.id}
                  content={history.content}
                  questType={history.questType}
                  interestName={history.subjectName}
                  date={history.completedDateTime}
                />
              ))}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}
