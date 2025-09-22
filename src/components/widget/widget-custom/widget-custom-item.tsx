import { calculateWidgetHeight, calculateWidgetWidth } from '@/components/widget/utils'
import { useDraggable } from '@dnd-kit/core'
import { Box, IconButton } from '@mui/material'
import { ReactNode } from 'react'

const PREVIEW_SCALE = 0.5
const PREVIEW_PADDING = 10

interface WidgetCustomItemProps {
  id: string
  width: number
  height: number
  children?: ReactNode
}

export function WidgetCustomItem({ id, width, height, children }: WidgetCustomItemProps) {
  const { setNodeRef, listeners, attributes } = useDraggable({
    id: `${id}S${height}x${width}`,
    data: { id, width, height, preview: children },
  })

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
