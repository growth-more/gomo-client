import { alpha, Stack } from '@mui/material'
import { DateSelector, Timeline } from './components'
import { useState } from 'react'
import { useHistory } from '@/api/hooks/use-history'
import { ScrollContainer } from '@/components/scrollbar'

export function HistoryPage() {
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth())

  const { history } = useHistory(year, month)

  const dataHandler = (year: number, month: number) => {
    setYear(year)
    setMonth(month)
  }

  return (
    <Stack direction="row" width={1} height={1} p={1} spacing={1}>
      <DateSelector year={year} month={month} onChange={dataHandler} />
      <Stack
        flex={1}
        height={1}
        bgcolor={(theme) => alpha(theme.palette.common.black, 0.1)}
        borderRadius={1}
        border={1}
        borderColor="divider"
        overflow="hidden"
      >
        <ScrollContainer sx={{ p: 1, overflowX: 'hidden' }}>
          <Timeline data={history} />
        </ScrollContainer>
      </Stack>
    </Stack>
  )
}
