import { calculateWidgetHeight, calculateWidgetWidth } from '@/components/widget/utils'
import { useDraggable } from '@dnd-kit/core'
import { Box, IconButton } from '@mui/material'
import { ReactNode, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const PREVIEW_SCALE = 0.5
const PREVIEW_PADDING = 10

interface WidgetCustomItemProps {
  widgetId: string
  width: number
  height: number
  children?: ReactNode
}

export function WidgetCustomItem({ widgetId, width, height, children }: WidgetCustomItemProps) {
  const [id, setId] = useState<string>(uuidv4())

  const { setNodeRef, listeners, attributes, active } = useDraggable({
    id,
    data: { id, widgetId, width, height, preview: children },
  })

  useEffect(() => {
    if (!active) {
      setId(uuidv4())
    }
  }, [active])

  return (
    <IconButton
      ref={setNodeRef}
      sx={{
        borderRadius: 1,
        width: calculateWidgetWidth(width) * PREVIEW_SCALE + PREVIEW_PADDING,
        height: calculateWidgetHeight(height) * PREVIEW_SCALE + PREVIEW_PADDING,
        overflow: 'hidden',
        cursor: 'pointer',
      }}
      {...listeners}
      {...attributes}
    >
      <Box sx={{ pointerEvents: 'none', userSelect: 'none', transform: `scale(${PREVIEW_SCALE})` }}>
        {children}
      </Box>
    </IconButton>
  )
}
