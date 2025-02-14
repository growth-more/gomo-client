import { Box } from '@mui/material'
import { ReactNode } from 'react'
import { ResizeEnable, Rnd } from 'react-rnd'
import { WindowHeader } from './window-header'
import { useBoolean } from '@/hooks'

const DEFAULT_MIN_WIDTH = 150
const DEFAULT_MIN_HEIGHT = 100

const DISABLE_RESIZE: ResizeEnable = {
  top: false,
  right: false,
  bottom: false,
  left: false,
  topRight: false,
  bottomRight: false,
  bottomLeft: false,
  topLeft: false,
}

interface WindowProps {
  children?: ReactNode
  resizable?: boolean
  closable?: boolean
  onClose?: () => void
}

export function Window({ children, resizable, closable, onClose }: WindowProps) {
  const draggable = useBoolean()

  return (
    <Rnd
      bounds="window"
      minWidth={DEFAULT_MIN_WIDTH}
      minHeight={DEFAULT_MIN_HEIGHT}
      disableDragging={!draggable.value}
      enableResizing={resizable ? undefined : DISABLE_RESIZE}
    >
      <Box
        width={1}
        height={1}
        bgcolor={(theme) => theme.palette.background.paper}
        overflow="hidden"
        borderRadius={2}
        border={1}
        borderColor="divider"
      >
        <WindowHeader
          title="Window"
          onEnter={draggable.onTrue}
          onLeave={draggable.onFalse}
          closable={closable}
          onClose={onClose}
        />
        <Box p={2}>{children}</Box>
      </Box>
    </Rnd>
  )
}
