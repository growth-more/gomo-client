import { ReactNode } from 'react'

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
  closable?: boolean
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
