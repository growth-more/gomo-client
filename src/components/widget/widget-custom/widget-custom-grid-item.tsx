import { ManagerData } from '@/components/widget/widget.types'
import { calculateWidgetHeight, calculateWidgetWidth } from '@/components/widget/utils'
import { useDraggable } from '@dnd-kit/core'
import { Box } from '@mui/material'

interface WidgetCustomGridItemProps {
  widgetData: ManagerData
}

export function WidgetCustomGridItem({ widgetData }: WidgetCustomGridItemProps) {
  const { setNodeRef, listeners, attributes } = useDraggable({
    id: `${widgetData.name}S${widgetData.height}x${widgetData.width}`,
    data: {
      id: widgetData.id,
      name: widgetData.name,
      width: widgetData.width,
      height: widgetData.height,
      preview: widgetData.preview,
    },
  })

  return (
    <Box
      ref={setNodeRef}
      gridRow={widgetData.row + 1}
      gridColumn={widgetData.column + 1}
      width={calculateWidgetWidth(widgetData.width)}
      height={calculateWidgetHeight(widgetData.height)}
      sx={{
        ':hover': {
          cursor: 'pointer',
          opacity: 0.85,
        },
        transition: 'opacity 0.2s',
      }}
      {...listeners}
      {...attributes}
    >
      <Box sx={{ pointerEvents: 'none', userSelect: 'none' }}>{widgetData.preview}</Box>
    </Box>
  )
}
