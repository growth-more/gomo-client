import { ScrollContainer } from '@/components/scrollbar'
import {
  Box,
  darken,
  lighten,
  Stack,
  SxProps,
  Theme,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'
import dayjs from 'dayjs'
import { useCallback, useMemo } from 'react'

export interface ICalenderHeatmapData {
  date: Date
  count: number
}

interface ICellData {
  date: Date | null
  count: number
}

interface ICalendarHeatmapProps {
  data: ICalenderHeatmapData[]
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
const WEEKDAY = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

export function CalendarHeatmap({
  data,
  endDate,
  color: customColor,
  thresholds = DEFAULT_THREASHOLDS,
  cellSize = DEFAULT_CELL_SIZE,
  customFn,
  onClick,
  sx,
}: ICalendarHeatmapProps) {
  const theme = useTheme()

  const startDate = dayjs(endDate).subtract(1, 'y')

  const heatmapArr = useMemo(() => {
    const tmpArrLength = dayjs(endDate).diff(startDate, 'd') + 1
    const tmpArr: ICellData[] = []
    for (let i = 0; i < tmpArrLength; i++) {
      tmpArr.push({ count: 0, date: startDate.add(i, 'd').toDate() })
    }

    for (const curr of data) {
      const isBefore = dayjs(curr.date).isBefore(startDate, 'd')
      const isAfter = dayjs(curr.date).isAfter(endDate, 'd')
      if (isBefore || isAfter) {
        continue
      }
      const idx = dayjs(curr.date).endOf('d').diff(startDate, 'd')
      tmpArr[idx].count += curr.count
    }
    // 앞쪽 빈 칸
    tmpArr.unshift(
      ...Array.from({ length: startDate.day() }, () => ({ count: 0, date: null } as ICellData))
    )
    // 뒤쪽 빈 칸
    tmpArr.push(
      ...Array.from(
        { length: 6 - dayjs(endDate).day() },
        () => ({ count: 0, date: null } as ICellData)
      )
    )

    const result: ICellData[][] = Array.from({ length: 7 }, () => [])
    tmpArr.forEach((cell, i) => {
      result[i % 7].push(cell)
    })
    return result
  }, [data, endDate, startDate])

  const colorSelector = useCallback(
    (count: number) => {
      if (customFn) {
        return customFn(count)
      }
      const color = lighten(customColor ?? theme.palette.primary.main, 0.2)
      for (let i = 0; i < thresholds.length; i++) {
        const next = i === thresholds.length - 1 || count < thresholds[i + 1]
        if (count >= thresholds[i] && next) {
          return darken(color, i * 0.1)
        }
      }
      return theme.palette.divider
    },
    [customColor, customFn, theme, thresholds]
  )

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
        <ScrollContainer>
          <Stack spacing="2px">
            {heatmapArr.map((line, i) => (
              <Stack key={i} direction="row" spacing="2px">
                {line.map((cell, j) =>
                  cell.date ? (
                    <Tooltip
                      key={j}
                      title={`${dayjs(cell.date).format('YYYY-MM-DD')}: ${cell.count}개`}
                      disableInteractive
                    >
                      <Box
                        borderRadius={1}
                        width={cellSize}
                        height={cellSize}
                        flexShrink={0}
                        bgcolor={colorSelector(cell.count)}
                        onClick={() => onClick?.(cell.date!)}
                        sx={{ cursor: 'pointer', ':hover': { border: 1 } }}
                      />
                    </Tooltip>
                  ) : (
                    <Box key={j} width={cellSize} height={cellSize} flexShrink={0} />
                  )
                )}
              </Stack>
            ))}
          </Stack>
        </ScrollContainer>
      </Stack>

      {/* Info */}
      <Stack direction="row" spacing="2px" justifyContent="flex-start" display="none">
        {thresholds.map((threshold, i) => (
          <Tooltip key={i} title={`${threshold} 이상`} disableInteractive>
            <Box
              width={cellSize}
              height={cellSize}
              borderRadius={1}
              bgcolor={colorSelector(threshold)}
              sx={{ cursor: 'pointer' }}
            />
          </Tooltip>
        ))}
      </Stack>
    </Stack>
  )
}
