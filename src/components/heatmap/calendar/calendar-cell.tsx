import { getCellColor } from '@/components/heatmap/calendar/utils'
import { useHeatmapCalendarContext } from '@/components/heatmap/calendar/context'
import { CellData } from '@/components/heatmap/calendar/types'
import { Box, Tooltip } from '@mui/material'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import weekOfYear from 'dayjs/plugin/weekOfYear'

dayjs.extend(advancedFormat)
dayjs.extend(weekOfYear)

interface CalendarCellProps {
  data: CellData
  onClick?: (date: Date) => void
  unselected?: boolean
}

export function CalendarCell({ data: cell, unselected, onClick }: CalendarCellProps) {
  const { color, emptyColor, thresholds, width, height, type, customFn } =
    useHeatmapCalendarContext()

  if (cell.date === null) {
    return <Box width={width} height={height} flexShrink={0} />
  }

  const options = {
    title: `${dayjs(cell.date).format('YYYY년 MM월 DD일')}: ${cell.count}개 완료`,
    bgcolor: getCellColor(cell.count, thresholds, color, emptyColor),
  }

  if (customFn) {
    options.bgcolor = customFn(cell.count)
  }
  if (type === 'WEEKLY') {
    options.title = `${dayjs(cell.date).subtract(6, 'day').format('YYYY년 MM월 DD일')} ~ ${dayjs(
      cell.date
    ).format('YYYY년 MM월 DD일')}: ${cell.count}개 완료`
  }
  if (type === 'MONTHLY') {
    options.title = `${dayjs(cell.date).format('YYYY년 MM월')}: ${cell.count}개 완료`
  }

  return (
    <Tooltip title={options.title}>
      <Box
        width={width}
        height={height}
        flexShrink={0}
        borderRadius={1}
        bgcolor={options.bgcolor}
        onClick={() => onClick?.(cell.date!)}
        sx={{ cursor: 'pointer', opacity: unselected ? 0.3 : 1 }}
      />
    </Tooltip>
  )
}
