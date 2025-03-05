import { CalenderHeatmapData, CellData } from '@/components/heatmap/calendar/types'
import dayjs from 'dayjs'
import _ from 'lodash'
import { useMemo } from 'react'

export function useMonthlyCell(data: CalenderHeatmapData[], endDate: Date) {
  const startDate = dayjs(endDate).subtract(11, 'month').startOf('month')

  const cells = useMemo(() => {
    const rawCells = _.times<CellData>(12, (i) => ({
      count: 0,
      date: startDate.add(i, 'month').startOf('month').toDate(),
    }))

    data.forEach((curr) => {
      const isBefore = dayjs(curr.date).isBefore(startDate, 'day')
      const isAfter = dayjs(curr.date).isAfter(endDate, 'day')
      if (!isBefore && !isAfter) {
        const idx = dayjs(curr.date).diff(startDate, 'month')
        rawCells[idx].count += curr.count
      }
    })

    return rawCells.reduce<CellData[][]>(
      (acc, curr, i) => {
        acc[Math.floor(i / 3)].push(curr)
        return acc
      },
      _.times<CellData[]>(4, () => [])
    )
  }, [data, endDate, startDate])

  return { cells }
}
