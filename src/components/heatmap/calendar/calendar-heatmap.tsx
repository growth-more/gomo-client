import { CalendarCell } from '@/components/heatmap/calendar/calendar-cell'
import { INFO_LABEL } from '@/components/heatmap/calendar/constant'
import {
  HeatmapCalendarProvider,
  IHeatmapCalendarContext,
} from '@/components/heatmap/calendar/context'
import { useDailyCell, useWeeklyCell } from '@/components/heatmap/calendar/hooks'
import { useMonthlyCell } from '@/components/heatmap/calendar/hooks/use-monthly-cell'
import { CalendarHeatmapType, CalenderHeatmapData } from '@/components/heatmap/calendar/types'
import { ScrollContainer } from '@/components/scrollbar'
import { Stack, SxProps, Theme, Typography, useTheme } from '@mui/material'
import { useMemo } from 'react'

interface CalendarHeatmapProps {
  data: CalenderHeatmapData[]
  endDate: Date
  cellSize?: number
  color?: string
  thresholds?: number[]
  customFn?: (count: number) => string
  onSelect?: (date: Date) => void
  onClick?: (date: Date) => void
  sx?: SxProps<Theme>
  type?: CalendarHeatmapType
  selectedDate?: Date | null
}

const DEFAULT_CELL_SIZE = 15
const DEFAULT_THREASHOLDS = [1, 2, 3, 4]

export function CalendarHeatmap({
  data,
  endDate,
  type = 'DAILY',
  color: customColor,
  thresholds = DEFAULT_THREASHOLDS,
  cellSize = DEFAULT_CELL_SIZE,
  selectedDate,
  customFn,
  onSelect,
  onClick,
  sx,
}: CalendarHeatmapProps) {
  const theme = useTheme()

  const { cells: dailyCells } = useDailyCell(data, endDate)
  const { cells: weeklyCells } = useWeeklyCell(data, endDate)
  const { cells: monthlyCells } = useMonthlyCell(data, endDate)

  const cells = useMemo(() => {
    if (type === 'DAILY') {
      return dailyCells
    }
    if (type === 'WEEKLY') {
      return weeklyCells
    }
    if (type === 'MONTHLY') {
      return monthlyCells
    }
    return dailyCells
  }, [dailyCells, monthlyCells, weeklyCells, type])

  const clickHandler = (date: Date | null, count: number) => {
    if (date === null) {
      return
    }
    if (count > 0) {
      onSelect?.(date!)
    }
    onClick?.(date)
  }

  const context = useMemo(() => {
    const context: IHeatmapCalendarContext = {
      width: cellSize,
      height: cellSize,
      color: customColor ?? theme.palette.primary.main,
      thresholds,
      emptyColor: theme.palette.divider,
      customFn,
      type,
    }
    return context
  }, [
    cellSize,
    customColor,
    customFn,
    theme.palette.divider,
    theme.palette.primary.main,
    thresholds,
    type,
  ])

  return (
    <Stack spacing={3} sx={sx}>
      <Stack direction="row" spacing={2}>
        {/* Weekday info */}
        <Stack spacing="2px">
          {INFO_LABEL[type].map((week, i) => (
            <Stack
              height={cellSize}
              justifyContent="center"
              alignItems="center"
              overflow="hidden"
              flexShrink={0}
              key={i}
            >
              <Typography fontSize={cellSize * 0.8} fontWeight={600} color="text.secondary" noWrap>
                {week}
              </Typography>
            </Stack>
          ))}
        </Stack>

        {/* Cell area */}
        <HeatmapCalendarProvider context={context}>
          <ScrollContainer>
            <Stack spacing="2px" direction="row" pb={2}>
              {cells.map((column, i) => (
                <Stack key={i} spacing="2px">
                  {column.map((cell, j) => (
                    <CalendarCell
                      key={j}
                      data={cell}
                      onClick={() => clickHandler(cell.date, cell.count)}
                      unselected={!!selectedDate && selectedDate.getTime() !== cell.date?.getTime()}
                    />
                  ))}
                </Stack>
              ))}
            </Stack>
          </ScrollContainer>
        </HeatmapCalendarProvider>
      </Stack>
    </Stack>
  )
}
