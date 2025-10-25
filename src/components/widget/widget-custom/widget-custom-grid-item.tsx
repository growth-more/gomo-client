import { ManagerData } from '@/components/widget/widget.types'
import {
  calculateWidgetHeight,
  calculateWidgetWidth,
  getWidgetPreview,
} from '@/components/widget/utils'
import { useDraggable } from '@dnd-kit/core'
import { Box, IconButton, Stack } from '@mui/material'
import { Iconify } from '@/components/iconify'

interface WidgetCustomGridItemProps {
  widgetData: ManagerData
  removeWidget: (id: string) => void
}

export function WidgetCustomGridItem({ widgetData, removeWidget }: WidgetCustomGridItemProps) {
  const { setNodeRef, listeners, attributes } = useDraggable({
    id: widgetData.id,
    data: {
      id: widgetData.id,
      widgetId: widgetData.widgetId,
      width: widgetData.width,
      height: widgetData.height,
    },
  })

  return (
    <Box
      position="relative"
      gridRow={widgetData.row + 1}
      gridColumn={widgetData.column + 1}
      width={calculateWidgetWidth(widgetData.width)}
      height={calculateWidgetHeight(widgetData.height)}
    >
      <IconButton
        sx={{
          position: 'absolute',
          top: -10,
          left: -10,
          p: 0,
          borderRadius: 100,
          zIndex: 1,
        }}
        color="error"
        onClick={() => removeWidget(widgetData.id)}
      >
        <Stack
          border={1}
          borderColor={(theme) => theme.palette.border.main}
          borderRadius={100}
          bgcolor={(theme) => theme.palette.background.main}
          p={0.5}
        >
          <Iconify icon="material-symbols:close-rounded" width={15} />
        </Stack>
      </IconButton>
      <Box
        ref={setNodeRef}
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
        <Box sx={{ pointerEvents: 'none', userSelect: 'none' }}>
          {getWidgetPreview(widgetData.widgetId, widgetData.width, widgetData.height)}
        </Box>
      </Box>
    </Box>
  )
}
