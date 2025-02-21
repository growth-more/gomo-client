import { alpha, Box, Stack } from '@mui/material'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Rnd } from 'react-rnd'
import { WindowHeader } from './window-header'
import { useBoolean } from '@/hooks'
import { WindowViewPosition, WindowViewProps, WindowViewSize } from './type'
import {
  DEFAULT_MANAGER_SELECTOR,
  DEFAULT_MIN_HEIGHT,
  DEFAULT_MIN_WIDTH,
  DEFAULT_VIEW_POSITION,
  DEFAULT_VIEW_SIZE,
  DISABLE_RESIZE,
  MANAGER_PADDING,
} from './constant'
import { useWindowStore } from '@/stores'

export function WindowView({
  id,
  title,
  resizable,
  closable,
  defaultPosition,
  defaultSize,
  children,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
}: WindowViewProps) {
  const { removeView, shiftToTop } = useWindowStore()

  const rnd = useRef<Rnd>(null)

  const [size, setSize] = useState<WindowViewSize>(defaultSize ?? DEFAULT_VIEW_SIZE)
  const [position, setPosition] = useState<WindowViewPosition>(
    defaultPosition ?? DEFAULT_VIEW_POSITION
  )

  const draggable = useBoolean()

  const resizeHandler = useCallback(() => {
    const endPosition: WindowViewPosition = {
      x: position.x + size.width,
      y: position.y + size.height,
    }

    const edgePosition: WindowViewPosition = {
      x: window.innerWidth - MANAGER_PADDING,
      y: window.innerHeight - MANAGER_PADDING,
    }

    if (endPosition.x > edgePosition.x) {
      setPosition({ x: edgePosition.x - size.width - MANAGER_PADDING, y: position.y })
    }

    if (endPosition.y > edgePosition.y) {
      setPosition({ x: position.x, y: edgePosition.y - size.height - MANAGER_PADDING })
    }
  }, [position, size])

  const shiftToTopHandler = () => {
    shiftToTop(id)
  }

  const closeHandler = () => {
    removeView(id)
  }

  useEffect(() => {
    window.addEventListener('resize', resizeHandler)
    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [resizeHandler])

  useEffect(() => {
    setSize({
      width: rnd.current?.getSelfElement()?.clientWidth ?? DEFAULT_VIEW_SIZE.width,
      height: rnd.current?.getSelfElement()?.clientHeight ?? DEFAULT_VIEW_SIZE.height,
    })
  }, [])

  return (
    <Rnd
      ref={rnd}
      bounds={DEFAULT_MANAGER_SELECTOR}
      minWidth={minWidth ?? DEFAULT_MIN_WIDTH}
      minHeight={minHeight ?? DEFAULT_MIN_HEIGHT}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
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
      <Stack
        width={1}
        height={1}
        bgcolor={(theme) => alpha(theme.palette.background.paper, 0.6)}
        overflow="hidden"
        borderRadius={2}
        border={1}
        borderColor="divider"
        onMouseDown={shiftToTopHandler}
        sx={{ backdropFilter: 'blur(10px)' }}
      >
        <WindowHeader
          title={title}
          onEnter={draggable.onTrue}
          onLeave={draggable.onFalse}
          closable={closable}
          onClose={closeHandler}
        />
        <Box width={1} flex={1}>
          {children}
        </Box>
      </Stack>
    </Rnd>
  )
}
