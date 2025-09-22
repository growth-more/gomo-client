import {
  WIDGET_COLUMN_SPACING,
  WIDGET_HEIGHT,
  WIDGET_ROW_SPACING,
  WIDGET_WIDTH,
} from '@/components/widget/constant'
import { OverStatus } from '@/components/widget/type'
import { useDroppable } from '@dnd-kit/core'
import { Box } from '@mui/material'
import { colord } from 'colord'

interface WidgetCustomGridProps {
  height: number
  mediaWidth: number
  overStatus: OverStatus | null
  gridData: boolean[][]
}

export function WidgetCustomGrid({
  height,
  mediaWidth,
  overStatus: overStatus,
  gridData,
}: WidgetCustomGridProps) {
  return (
    <Box
      display="grid"
      gridTemplateColumns={`repeat(${mediaWidth}, ${WIDGET_WIDTH}px)`}
      gridTemplateRows={`repeat(${height}, ${WIDGET_HEIGHT}px)`}
      rowGap={`${WIDGET_ROW_SPACING}px`}
      columnGap={`${WIDGET_COLUMN_SPACING}px`}
      mb="400px"
    >
      {Array.from({ length: height }).map((_, row) =>
        Array.from({ length: mediaWidth }).map((_, column) => (
          <WidgetCustomGridCell
            key={row * mediaWidth + column}
            row={row}
            column={column}
            isOver={overStatus?.row === row && overStatus?.column === column}
            isPossible={!!overStatus?.isPossible}
            isFilled={gridData[row][column]}
          />
        ))
      )}
    </Box>
  )
}

interface WidgetCustomGridCellProps {
  row: number
  column: number
  isOver: boolean
  isPossible: boolean
  isFilled: boolean
}

function WidgetCustomGridCell({
  row,
  column,
  isOver,
  isPossible,
  isFilled,
}: WidgetCustomGridCellProps) {
  const { setNodeRef } = useDroppable({
    id: `widget-grid-cell-${row}-${column}`,
    data: { row, column },
  })

  return (
    <Box
      ref={setNodeRef}
      border={3}
      borderRadius={1}
      borderColor={
        isOver
          ? isPossible
            ? (theme) => theme.palette.border.main
            : (theme) => theme.palette.error.main
          : (theme) => colord(theme.palette.border.main).alpha(0.2).toHex()
      }
      bgcolor={
        isFilled
          ? (theme) => colord(theme.palette.background.dark).alpha(0.3).toHex()
          : 'transparent'
      }
      sx={{
        borderStyle: isOver ? 'solid' : 'dashed',
      }}
    ></Box>
  )
}
