import { calculateWidgetHeight, calculateWidgetWidth } from '@/components/widget/utils'
import { useDraggable } from '@dnd-kit/core'
import { Box, Stack } from '@mui/material'
import { colord } from 'colord'
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
    data: { id, width, height },
  })

  return (
    <Stack
      ref={setNodeRef}
      justifyContent="center"
      alignItems="center"
      borderRadius={1}
      width={calculateWidgetWidth(width) * PREVIEW_SCALE + PREVIEW_PADDING}
      height={calculateWidgetHeight(height) * PREVIEW_SCALE + PREVIEW_PADDING}
      overflow="hidden"
      sx={{
        cursor: 'pointer',
        '&:hover': {
          bgcolor: (theme) => colord(theme.palette.background.dark).alpha(0.8).toHex(),
        },
      }}
      {...listeners}
      {...attributes}
    >
      <Box sx={{ pointerEvents: 'none', userSelect: 'none', transform: `scale(${PREVIEW_SCALE})` }}>
        {children}
      </Box>
    </Stack>
  )
}
