import { Box } from '@mui/material'
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { ResizeEnable, Rnd } from 'react-rnd'
import { WindowHeader } from './window-header'
import { useBoolean } from '@/hooks'
import { WindowViewPosition, WindowViewSize } from './type'

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

interface WindowViewProps {
  children?: ReactNode
  resizable?: boolean
  closable?: boolean
  onClose?: () => void
}

export function WindowView({ children, resizable, closable, onClose }: WindowViewProps) {
  const rnd = useRef<Rnd>(null)

  const [size, setSize] = useState<WindowViewSize>({ width: 0, height: 0 })
  const [position, setPosition] = useState<WindowViewPosition>({ x: 10, y: 10 })

  const draggable = useBoolean()

  const resizeHandler = useCallback(() => {
    const endPosition: WindowViewPosition = {
      x: position.x + size.width,
      y: position.y + size.height,
    }

    const edgePosition: WindowViewPosition = {
      x: window.innerWidth - 10,
      y: window.innerHeight - 10,
    }

    if (endPosition.x > edgePosition.x) {
      setPosition({ x: edgePosition.x - size.width - 10, y: position.y })
    }

    if (endPosition.y > edgePosition.y) {
      setPosition({ x: position.x, y: edgePosition.y - size.height - 10 })
    }
  }, [position, size])

  useEffect(() => {
    window.addEventListener('resize', resizeHandler)
    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [resizeHandler])

  useEffect(() => {
    setSize({
      width: rnd.current?.getSelfElement()?.clientWidth ?? 0,
      height: rnd.current?.getSelfElement()?.clientHeight ?? 0,
    })
  }, [])

  return (
    <Rnd
      ref={rnd}
      bounds="#window-manager"
      minWidth={DEFAULT_MIN_WIDTH}
      minHeight={DEFAULT_MIN_HEIGHT}
      disableDragging={!draggable.value}
      enableResizing={resizable ? undefined : DISABLE_RESIZE}
      position={position}
      size={size}
      onDragStop={(_, d) => setPosition({ x: d.x, y: d.y })}
      onResizeStop={(e, d, ref, delta, position) => {
        setSize({ width: ref.clientWidth, height: ref.clientHeight })
        setPosition(position)
      }}
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
