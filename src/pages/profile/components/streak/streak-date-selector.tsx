import { VerticalSelector, VerticalSelectorOption } from '@/components/selector'
import { SxProps, Theme } from '@mui/material'
import dayjs from 'dayjs'
import _ from 'lodash'
import { useMemo } from 'react'

export const START_YEAR = 2020

interface StreakDateSelectorProps {
  value: Date
  onChange?: (date: Date) => void
  sx?: SxProps<Theme>
}

export function StreakDateSelector({ value, onChange, sx }: StreakDateSelectorProps) {
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
    <VerticalSelector options={options} value={selectedDate} onChange={onChangeHandler} sx={sx} />
  )
}
