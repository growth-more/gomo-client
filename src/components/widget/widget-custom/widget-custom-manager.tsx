import { ActiveWidget, ManagerData, OverStatus, Position } from '@/components/widget/widget.types'
import { WidgetCustomGrid } from '@/components/widget/widget-custom/widget-custom-grid'
import { WidgetCustomToolbox } from '@/components/widget/widget-custom/widget-custom-toolbox'
import { useBoolean } from '@/hooks'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  pointerWithin,
} from '@dnd-kit/core'
import { Box } from '@mui/material'
import _ from 'lodash'
import { useMemo, useState } from 'react'

interface WidgetCustomManagerProps {
  mediaWidth: number
}

export function WidgetCustomManager({ mediaWidth }: WidgetCustomManagerProps) {
  const [active, setActive] = useState<ActiveWidget | null>(null)
  const [overPosition, setOverPosition] = useState<OverStatus | null>(null)
  const [widgetData, setWidgetData] = useState<ManagerData[]>([])

  const toolboxCollapsed = useBoolean()
  const toolboxCollapsedMemory = useBoolean()

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

  const dragStartHandler = (e: DragStartEvent) => {
    setActive(e.active.data.current as ActiveWidget)
    toolboxCollapsedMemory.setValue(toolboxCollapsed.value)
    toolboxCollapsed.onTrue()
  }

  const dragEndHandler = (e: DragEndEvent) => {
    setActive(null)
    setOverPosition(null)

    if (!toolboxCollapsedMemory.value) {
      toolboxCollapsed.onFalse()
    }

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
      setOverPosition(null)
      return
    }

    const { width, height } = e.active.data.current as ActiveWidget
    const { row, column } = e.over.data.current as Position

    const isCollied = checkCollision(row, column, width, height)
    const isOutOfBound = checkOutOfBound(row, column, width, height)
    const isPossible = !isCollied && !isOutOfBound

    setOverPosition({ row, column, isPossible })
  }

  return (
    <DndContext
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
      onDragOver={dragOverHandler}
      collisionDetection={pointerWithin}
    >
      <WidgetCustomGrid
        height={mediaHeight}
        mediaWidth={mediaWidth}
        overStatus={overPosition}
        widgetData={widgetData}
        removeWidget={removeWidget}
      />
      <WidgetCustomToolbox
        collapsed={toolboxCollapsed.value}
        toggleCollapsed={toolboxCollapsed.toggle}
      />

      <DragOverlay>
        {active && (
          <Box sx={{ pointerEvents: 'none', userSelect: 'none', opacity: 0.8 }}>
            {active.preview}
          </Box>
        )}
      </DragOverlay>
    </DndContext>
  )
}
