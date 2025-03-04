import { VerticalSelector, VerticalSelectorOption } from '@/components/selector'
import { START_YEAR } from '@/constants'
import { Box, SxProps, Theme } from '@mui/material'
import dayjs from 'dayjs'
import _ from 'lodash'
import { useMemo } from 'react'

interface StreakSelectorProps {
  value: Date
  onChange?: (date: Date) => void
  sx?: SxProps<Theme>
}

export function StreakSelector({ value, onChange, sx }: StreakSelectorProps) {
  const selectedDate = useMemo(() => dayjs(value).endOf('day').unix(), [value])

  const options = useMemo<VerticalSelectorOption<number>[]>(() => {
    const res: VerticalSelectorOption<number>[] = [
      {
        label: '최근',
        value: dayjs().endOf('day').unix(),
      },
    ]
    _.range(new Date().getFullYear(), START_YEAR - 1, -1).forEach((year) => {
      res.push({
        label: `${year}년`,
        value: dayjs().year(year).endOf('year').unix(),
      })
    })
    return res
  }, [])

  const onChangeHandler = (value: number) => {
    onChange?.(new Date(value * 1000))
  }

  return (
    <Box sx={{ ...sx }}>
      <VerticalSelector options={options} value={selectedDate} onChange={onChangeHandler} />
    </Box>
  )
}
