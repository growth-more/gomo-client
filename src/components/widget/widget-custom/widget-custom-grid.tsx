import {
  WIDGET_COLUMN_SPACING,
  WIDGET_HEIGHT,
  WIDGET_ROW_SPACING,
  WIDGET_WIDTH,
} from '@/components/widget/constant'
import { ActiveWidget, ManagerData, OverStatus, Position } from '@/components/widget/widget.types'
import { WidgetCustomGridItem } from '@/components/widget/widget-custom'
import { DragEndEvent, DragOverEvent, useDndMonitor, useDroppable } from '@dnd-kit/core'
import { Box, Stack } from '@mui/material'
import { colord } from 'colord'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import _ from 'lodash'

interface WidgetCustomGridProps {
  mediaWidth: number
  widgetData: ManagerData[]
  setWidgetData: Dispatch<SetStateAction<ManagerData[]>>
}

export function WidgetCustomGrid({ mediaWidth, widgetData, setWidgetData }: WidgetCustomGridProps) {
  const [overStatus, setOverStatus] = useState<OverStatus | null>(null)

  const mediaHeight = useMemo(() => {
    const max = _(widgetData)
      .map((widget) => widget.row + widget.height)
      .max()

    if (max) {
      return max + 1
    }
    return 1
  }, [widgetData])

  const gridData = useMemo(() => {
    const grid = _.times(mediaHeight, () => _.times(mediaWidth, () => false))
    widgetData.forEach((widget) => {
      for (let r = widget.row; r < widget.row + widget.height; r++) {
        for (let c = widget.column; c < widget.column + widget.width; c++) {
          if (r < mediaHeight && c < mediaWidth) {
            grid[r][c] = true
          }
        }
      }
    })
    return grid
  }, [widgetData, mediaHeight, mediaWidth])

  const removeWidget = (id: string) => {
    setWidgetData((prev) => prev.filter((widget) => widget.id !== id))
  }

  const checkCollision = (row: number, column: number, width: number, height: number) => {
    for (let r = row; r < row + height; r++) {
      for (let c = column; c < column + width; c++) {
        if (gridData[r][c]) {
          return true
        }
      }
    }
    return false
  }

  const checkOutOfBound = (row: number, column: number, width: number, height: number) => {
    return row + height > mediaHeight || column + width > mediaWidth
  }

  const dragEndHandler = (e: DragEndEvent) => {
    setOverStatus(null)

    if (!e.over) {
      return
    }

    const { id, widgetId, width, height, preview } = e.active.data.current as ActiveWidget
    const { row, column } = e.over.data.current as Position
    if (checkCollision(row, column, width, height)) {
      return
    }
    if (checkOutOfBound(row, column, width, height)) {
      return
    }
    setWidgetData((prev) => [
      ...prev.filter((widget) => widget.id !== id),
      { id, widgetId, width, height, row, column, preview },
    ])
  }

  const dragOverHandler = (e: DragOverEvent) => {
    if (!e.over) {
      setOverStatus(null)
      return
    }

    const { width, height } = e.active.data.current as ActiveWidget
    const { row, column } = e.over.data.current as Position

    const isCollied = checkCollision(row, column, width, height)
    const isOutOfBound = checkOutOfBound(row, column, width, height)
    const isPossible = !isCollied && !isOutOfBound

    setOverStatus({ row, column, isPossible })
  }

  useDndMonitor({
    onDragEnd: dragEndHandler,
    onDragOver: dragOverHandler,
  })

  return (
    <Stack position="relative" width={1} height={1} mb={40}>
      <Box
        display="grid"
        position="absolute"
        left={0}
        top={0}
        gridTemplateColumns={`repeat(${mediaWidth}, ${WIDGET_WIDTH}px)`}
        gridTemplateRows={`repeat(${mediaHeight}, ${WIDGET_HEIGHT}px)`}
        rowGap={`${WIDGET_ROW_SPACING}px`}
        columnGap={`${WIDGET_COLUMN_SPACING}px`}
      >
        {widgetData.map((widget, i) => (
          <WidgetCustomGridItem key={i} widgetData={widget} removeWidget={removeWidget} />
        ))}
      </Box>

      <Box
        display="grid"
        gridTemplateColumns={`repeat(${mediaWidth}, ${WIDGET_WIDTH}px)`}
        gridTemplateRows={`repeat(${mediaHeight}, ${WIDGET_HEIGHT}px)`}
        rowGap={`${WIDGET_ROW_SPACING}px`}
        columnGap={`${WIDGET_COLUMN_SPACING}px`}
      >
        {Array.from({ length: mediaHeight }).map((_, row) =>
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
          : (theme) => colord(theme.palette.border.main).alpha(0.5).toHex()
      }
      sx={{
        borderStyle: isOver ? 'solid' : 'dashed',
      }}
    ></Box>
  )
}
