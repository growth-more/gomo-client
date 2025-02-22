import { ReactNode } from 'react'
import { ResizeEnable } from 'react-rnd'

interface WindowViewState {
  id: string
  props: WindowViewProps
  //   position: WindowViewPosition
  //   size: WindowViewSize
}

interface WindowViewProps {
  id: string
  title?: string
  defaultPosition?: WindowViewPosition
  defaultSize?: WindowViewSize
  children?: ReactNode
  resizable?: boolean
  resizeOption?: ResizeEnable
  closable?: boolean
  minWidth?: number
  minHeight?: number
  maxWidth?: number
  maxHeight?: number
}

interface WindowViewPosition {
  x: number
  y: number
}

interface WindowViewSize {
  width: number
  height: number
}

export type { WindowViewState, WindowViewProps, WindowViewPosition, WindowViewSize }
