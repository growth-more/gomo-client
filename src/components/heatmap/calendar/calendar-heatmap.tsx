import { CalendarCell } from '@/components/heatmap/calendar/calendar-cell'
import { CalendarContext } from '@/components/heatmap/calendar/context'
import { CalenderHeatmapData } from '@/components/heatmap/calendar/types'
import { useDailyCell } from '@/components/heatmap/calendar/use-daily-cell'
import { ScrollContainer } from '@/components/scrollbar'
import { Stack, SxProps, Theme, Typography, useTheme } from '@mui/material'

interface CalendarHeatmapProps {
  data: CalenderHeatmapData[]
  endDate: Date
  cellSize?: number
  color?: string
  thresholds?: number[]
  customFn?: (count: number) => string
  onClick?: (date: Date) => void
  sx?: SxProps<Theme>
}

const DEFAULT_CELL_SIZE = 15
const DEFAULT_THREASHOLDS = [1, 2, 3, 4]
const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토']
// const WEEKDAY = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

export function CalendarHeatmap({
  data,
  endDate,
  color: customColor,
  thresholds = DEFAULT_THREASHOLDS,
  cellSize = DEFAULT_CELL_SIZE,
  customFn,
  onClick,
  sx,
}: CalendarHeatmapProps) {
  const theme = useTheme()
  const { cells } = useDailyCell(data, endDate)

  return (
    <Stack spacing={3} sx={sx}>
      <Stack direction="row" spacing={2}>
        {/* Weekday info */}
        <Stack spacing="2px">
          {WEEKDAY.map((week, i) => (
            <Stack
              width={cellSize}
              height={cellSize}
              justifyContent="center"
              alignItems="center"
              overflow="hidden"
              flexShrink={0}
              key={i}
            >
              <Typography fontSize={cellSize * 0.8} fontWeight={600} color="text.secondary">
                {week}
              </Typography>
            </Stack>
          ))}
        </Stack>

        {/* Cell area */}
        <CalendarContext.Provider
          value={{
            cellSize,
            color: customColor ?? theme.palette.primary.main,
            thresholds,
            emptyColor: theme.palette.divider,
            customFn,
          }}
        >
          <ScrollContainer>
            <Stack spacing="2px" direction="row">
              {cells.map((column, i) => (
                <Stack key={i} spacing="2px">
                  {column.map((cell, j) => (
                    <CalendarCell key={j} data={cell} onClick={onClick} />
                  ))}
                </Stack>
              ))}
            </Stack>
          </ScrollContainer>
        </CalendarContext.Provider>
      </Stack>
    </Stack>
  )
}
