import { WidgetCustomGrid } from '@/components/widget/widget-custom'
import { WidgetCustomToolbox } from '@/components/widget/widget-custom/widget-custom-toolbox'
import { ActiveWidget, ManagerData, WidgetSnapshot } from '@/components/widget/widget.types'
import { useBoolean } from '@/hooks'
import { DndContext, DragOverlay, DragStartEvent, pointerWithin } from '@dnd-kit/core'
import { Box, Stack } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'

interface WidgetCustomManagerProps {
  mediaWidth: number
  onSave?: () => void
  onCancel?: () => void
}

export function WidgetCustomManager({ mediaWidth, onSave, onCancel }: WidgetCustomManagerProps) {
  const [selectedWidth, setSelectedWidth] = useState<number>(mediaWidth)
  const [active, setActive] = useState<ActiveWidget | null>(null)

  const [widgetx1, setWidgetx1] = useState<ManagerData[]>([])
  const [widgetx2, setWidgetx2] = useState<ManagerData[]>([])
  const [widgetx3, setWidgetx3] = useState<ManagerData[]>([])

  const toolboxCollapsed = useBoolean()
  const toolboxCollapsedMemory = useBoolean()

  const dragStartHandler = (e: DragStartEvent) => {
    setActive(e.active.data.current as ActiveWidget)
    toolboxCollapsedMemory.setValue(toolboxCollapsed.value)
    toolboxCollapsed.onTrue()
  }

  const dragEndHandler = () => {
    setActive(null)
    if (!toolboxCollapsedMemory.value) {
      toolboxCollapsed.onFalse()
    }
  }

  const saveHandler = () => {
    const data: WidgetSnapshot = {
      mediaWidth1: widgetx1.map((widget) => ({
        id: widget.id,
        width: widget.width,
        height: widget.height,
        row: widget.row,
        column: widget.column,
      })),
      mediaWidth2: widgetx2.map((widget) => ({
        id: widget.id,
        width: widget.width,
        height: widget.height,
        row: widget.row,
        column: widget.column,
      })),
      mediaWidth3: widgetx3.map((widget) => ({
        id: widget.id,
        width: widget.width,
        height: widget.height,
        row: widget.row,
        column: widget.column,
      })),
    }
    console.log(data)
    console.log(JSON.stringify(data))
    onSave?.()
  }

  useEffect(() => {
    if (selectedWidth > mediaWidth) {
      setSelectedWidth(mediaWidth)
    }
  }, [mediaWidth, selectedWidth])

  const renderWidgetGrid = useMemo(() => {
    if (selectedWidth === 1) {
      return <WidgetCustomGrid mediaWidth={1} widgetData={widgetx1} setWidgetData={setWidgetx1} />
    }
    if (selectedWidth === 2) {
      return <WidgetCustomGrid mediaWidth={2} widgetData={widgetx2} setWidgetData={setWidgetx2} />
    }
    return <WidgetCustomGrid mediaWidth={3} widgetData={widgetx3} setWidgetData={setWidgetx3} />
  }, [selectedWidth, widgetx1, widgetx2, widgetx3])

  return (
    <DndContext
      collisionDetection={pointerWithin}
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
    >
      <Stack>{renderWidgetGrid}</Stack>
      <WidgetCustomToolbox
        mediaWidth={mediaWidth}
        selectedWidth={selectedWidth}
        setSelectedWidth={setSelectedWidth}
        collapsed={toolboxCollapsed.value}
        toggleCollapsed={toolboxCollapsed.toggle}
        onSave={saveHandler}
        onCancel={onCancel}
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
