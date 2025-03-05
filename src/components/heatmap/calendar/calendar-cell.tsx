import { getCellColor } from '@/components/heatmap/calendar/cell-color'
import { useHeatmapCalendarContext } from '@/components/heatmap/calendar/context'
import { CellData } from '@/components/heatmap/calendar/types'
import { Box, Tooltip } from '@mui/material'
import dayjs from 'dayjs'

interface CalendarCellProps {
  data: CellData
  onClick?: (date: Date) => void
}

export function CalendarCell({ data: cell, onClick }: CalendarCellProps) {
  const { color, emptyColor, thresholds, cellSize, customFn } = useHeatmapCalendarContext()

  if (cell.date === null) {
    return <Box width={cellSize} height={cellSize} flexShrink={0} />
  }

  const title = `${dayjs(cell.date).format('YYYY-MM-DD')}: ${cell.count}개`
  const bgcolor = customFn
    ? customFn(cell.count)
    : getCellColor(cell.count, thresholds, color, emptyColor)

  return (
    <Tooltip title={title}>
      <Box
        width={cellSize}
        height={cellSize}
        flexShrink={0}
        borderRadius={1}
        bgcolor={bgcolor}
        onClick={() => onClick?.(cell.date!)}
        sx={{ cursor: 'pointer', ':hover': { border: 1 } }}
      />
    </Tooltip>
  )
}
