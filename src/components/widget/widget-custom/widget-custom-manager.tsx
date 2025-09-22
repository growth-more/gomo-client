import { WIDGET_HEIGHT, WIDGET_WIDTH } from '@/components/widget/constant'
import { ActiveWidget, OverStatus, Position } from '@/components/widget/type'
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
import { colord } from 'colord'
import _ from 'lodash'
import { useMemo, useState } from 'react'

interface ManagerData {
  id: string
  width: number
  height: number
  row: number
  column: number
}

interface WidgetCustomManagerProps {
  mediaWidth: number
}

export function WidgetCustomManager({ mediaWidth }: WidgetCustomManagerProps) {
  const [height, setHeight] = useState(5)
  const [active, setActive] = useState<ActiveWidget | null>(null)
  const [overPosition, setOverPosition] = useState<OverStatus | null>(null)
  const [widgetData, setWidgetData] = useState<ManagerData[]>([])
  const toolboxCollapsed = useBoolean()

  const gridData = useMemo(() => {
    const grid = _.times(height, () => _.times(mediaWidth, () => false))
    widgetData.forEach((widget) => {
      for (let r = widget.row; r < widget.row + widget.height; r++) {
        for (let c = widget.column; c < widget.column + widget.width; c++) {
          if (r < height && c < mediaWidth) {
            grid[r][c] = true
          }
        }
      }
    })
    return grid
  }, [widgetData, height, mediaWidth])

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

  const dragStartHandler = (e: DragStartEvent) => {
    setActive(e.active.data.current as ActiveWidget)
    toolboxCollapsed.onTrue()
  }

  const dragEndHandler = (e: DragEndEvent) => {
    // console.group('dragEnd')
    // console.log(e.active.data.current)
    // console.log(e.over?.data.current)
    // console.groupEnd()

    setActive(null)
    setOverPosition(null)
    toolboxCollapsed.onFalse()

    if (!e.over) {
      return
    }

    const { id, width, height } = e.active.data.current as ActiveWidget
    const { row, column } = e.over.data.current as Position
    if (checkCollision(row, column, width, height)) {
      return
    }
    setWidgetData((prev) => [...prev, { id, width, height, row, column }])
  }

  const dragOverHandler = (e: DragOverEvent) => {
    if (!e.over) {
      setOverPosition(null)
      return
    }

    const { width, height } = e.active.data.current as ActiveWidget
    const { row, column } = e.over.data.current as Position
    const isCollied = checkCollision(row, column, width, height)
    setOverPosition({ row, column, isPossible: !isCollied })
  }

  return (
    <DndContext
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
      onDragOver={dragOverHandler}
      collisionDetection={pointerWithin}
    >
      <WidgetCustomGrid
        height={height}
        mediaWidth={mediaWidth}
        overStatus={overPosition}
        gridData={gridData}
      />
      <WidgetCustomToolbox
        collapsed={toolboxCollapsed.value}
        toggleCollapsed={toolboxCollapsed.toggle}
      />

      <DragOverlay>
        {active && (
          <Box
            width={WIDGET_WIDTH}
            height={WIDGET_HEIGHT}
            bgcolor={(theme) => colord(theme.palette.background.dark).alpha(0.5).toHex()}
            borderRadius={1}
            boxShadow="0 5 10px 10px rgba(0, 0, 0, 0.3)"
          />
        )}
      </DragOverlay>
    </DndContext>
  )
}
