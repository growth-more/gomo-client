import { useDraggable } from '@dnd-kit/core'
import { Box } from '@mui/material'
import { colord } from 'colord'

const PREVIEW_WIDTH = 200
const PREVIEW_HEIGHT = 200

interface WidgetCustomItemProps {
  id: string
  width: number
  height: number
}

export function WidgetCustomItem({ id, width, height }: WidgetCustomItemProps) {
  const { setNodeRef, listeners, attributes } = useDraggable({
    id: `${id}S${height}x${width}`,
    data: { id, width, height },
  })

  return (
    <Box
      borderRadius={1}
      ref={setNodeRef}
      width={PREVIEW_WIDTH * width}
      height={PREVIEW_HEIGHT * height}
      border={1}
      borderColor={(theme) => theme.palette.border.main}
      bgcolor={(theme) => colord(theme.palette.background.dark).alpha(0.5).toHex()}
      sx={{
        cursor: 'pointer',
        '&:hover': {
          bgcolor: (theme) => colord(theme.palette.background.dark).alpha(0.8).toHex(),
        },
      }}
      {...listeners}
      {...attributes}
    ></Box>
  )
}
