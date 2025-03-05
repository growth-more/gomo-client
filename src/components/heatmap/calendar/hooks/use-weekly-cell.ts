import { CalenderHeatmapData, CellData } from '@/components/heatmap/calendar/types'
import dayjs from 'dayjs'
import _ from 'lodash'
import { useMemo } from 'react'
import isoWeek from 'dayjs/plugin/isoWeek'

dayjs.extend(isoWeek)

/*
  ISO 8601을 기준으로 하여, 한 주의 시작은 월요일, 끝은 일요일로 합니다.
  2차원 배열의 column은 같은 달끼리 모으며, 이때 끝 날짜를 기준으로 합니다.
 */

export function useWeeklyCell(data: CalenderHeatmapData[], endDate: Date) {
  let startDate = dayjs(endDate).subtract(1, 'year').startOf('month').endOf('isoWeek')
  if (startDate.year() !== endDate.getFullYear()) {
    startDate = startDate.add(1, 'month').endOf('isoWeek')
  }

  const cells = useMemo(() => {
    const repeatCount = dayjs(endDate).diff(startDate, 'week') + 1
    const rawCells = _.times<CellData>(repeatCount, (i) => ({
      count: 0,
      date: startDate.add(i, 'week').startOf('day').toDate(),
    }))

    data.forEach((curr) => {
      const isBefore = dayjs(curr.date).isBefore(startDate, 'day')
      const isAfter = dayjs(curr.date).isAfter(endDate, 'day')
      if (!isBefore && !isAfter) {
        const idx = dayjs(curr.date).diff(startDate, 'week')
        rawCells[idx].count += curr.count
      }
    })

    const standardDate = dayjs(endDate).subtract(1, 'year').startOf('month')
    return rawCells.reduce<CellData[][]>(
      (acc, curr) => {
        acc[dayjs(curr.date).diff(standardDate, 'month')].push(curr)
        return acc
      },
      _.times<CellData[]>(14, () => [])
    )
  }, [data, endDate, startDate])

  return { cells }
}
