import type { CalenderHeatmapData, CellData } from '@/components/heatmap/calendar'
import dayjs from 'dayjs'
import _ from 'lodash'
import { useMemo } from 'react'

export function useDailyCell(data: CalenderHeatmapData[], endDate: Date) {
  const startDate = dayjs(endDate).subtract(1, 'year')

  const cells = useMemo(() => {
    const repeatCount = dayjs(endDate).diff(startDate, 'day') + 1
    const rawCells = _.times<CellData>(repeatCount, (i) => ({
      count: 0,
      date: startDate.add(i, 'day').toDate(),
    }))

    data.forEach((curr) => {
      const isBefore = dayjs(curr.date).isBefore(startDate, 'day')
      const isAfter = dayjs(curr.date).isAfter(endDate, 'day')
      if (!isBefore && !isAfter) {
        const idx = dayjs(curr.date).endOf('day').diff(startDate, 'day')
        rawCells[idx].count += curr.count
      }
    })

    const createEmptyCells = (): CellData => ({ count: 0, date: null })
    const frontEmptyCells = _.times<CellData>(startDate.day(), createEmptyCells)
    const backEmptyCells = _.times<CellData>(6 - dayjs(endDate).day(), createEmptyCells)
    const totalCells = [...frontEmptyCells, ...rawCells, ...backEmptyCells]

    return totalCells.reduce<CellData[][]>(
      (acc, curr, i) => {
        acc[Math.floor(i / 7)].push(curr)
        return acc
      },
      _.times(Math.floor(totalCells.length / 7), () => [])
    )
  }, [data, endDate, startDate])

  return { cells }
}
