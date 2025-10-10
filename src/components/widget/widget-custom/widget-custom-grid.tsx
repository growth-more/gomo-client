import {
  WIDGET_COLUMN_SPACING,
  WIDGET_HEIGHT,
  WIDGET_ROW_SPACING,
  WIDGET_WIDTH,
} from '@/components/widget/constant'
import { ManagerData, OverStatus } from '@/components/widget/widget.types'
import { WidgetCustomGridItem } from '@/components/widget/widget-custom'
import { useDroppable } from '@dnd-kit/core'
import { Box, Stack } from '@mui/material'
import { colord } from 'colord'

interface WidgetCustomGridProps {
  height: number
  mediaWidth: number
  overStatus: OverStatus | null
  widgetData: ManagerData[]
}

export function WidgetCustomGrid({
  height,
  mediaWidth,
  overStatus,
  widgetData,
}: WidgetCustomGridProps) {
  return (
    <Stack position="relative" width={1} height={1} mb={40}>
      <Box
        display="grid"
        position="absolute"
        left={0}
        top={0}
        gridTemplateColumns={`repeat(${mediaWidth}, ${WIDGET_WIDTH}px)`}
        gridTemplateRows={`repeat(${height}, ${WIDGET_HEIGHT}px)`}
        rowGap={`${WIDGET_ROW_SPACING}px`}
        columnGap={`${WIDGET_COLUMN_SPACING}px`}
      >
        {widgetData.map((widget, i) => (
          <WidgetCustomGridItem
            // key={`${widget.id}-${widget.row}-${widget.column}`}
            key={i}
            widgetData={widget}
          />
        ))}
      </Box>

      <Box
        display="grid"
        gridTemplateColumns={`repeat(${mediaWidth}, ${WIDGET_WIDTH}px)`}
        gridTemplateRows={`repeat(${height}, ${WIDGET_HEIGHT}px)`}
        rowGap={`${WIDGET_ROW_SPACING}px`}
        columnGap={`${WIDGET_COLUMN_SPACING}px`}
      >
        {Array.from({ length: height }).map((_, row) =>
          Array.from({ length: mediaWidth }).map((_, column) => (
            <WidgetCustomGridCell
              key={`GRID-CELL-${row * mediaWidth + column}`}
              row={row}
              column={column}
              isOver={overStatus?.row === row && overStatus?.column === column}
              isPossible={!!overStatus?.isPossible}
            />
          ))
        )}
      </Box>
    </Stack>
  )
}

interface WidgetCustomGridCellProps {
  row: number
  column: number
  isOver: boolean
  isPossible: boolean
}

function WidgetCustomGridCell({ row, column, isOver, isPossible }: WidgetCustomGridCellProps) {
  const { setNodeRef } = useDroppable({
    id: `widget-grid-cell-${row}-${column}`,
    data: { row, column },
  })

  return (
    <Box
      ref={setNodeRef}
      border={3}
      borderRadius={2}
      borderColor={
        isOver
          ? isPossible
            ? (theme) => theme.palette.common.white
            : (theme) => theme.palette.error.main
          : (theme) => colord(theme.palette.border.main).alpha(0.2).toHex()
      }
      sx={{
        borderStyle: isOver ? 'solid' : 'dashed',
      }}
    ></Box>
  )
}
