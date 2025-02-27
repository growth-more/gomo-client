import { Stack } from '@mui/material'
import { DateSelector } from './components'
import { useState } from 'react'

export function HistoryPage() {
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth())

  const dataHandler = (year: number, month: number) => {
    setYear(year)
    setMonth(month)
  }

  return (
    <Stack direction="row" height={1}>
      <Stack p={1}>
        <DateSelector year={year} month={month} onChange={dataHandler} />
      </Stack>
      <Stack flex={1} height={1}></Stack>
    </Stack>
  )
}
