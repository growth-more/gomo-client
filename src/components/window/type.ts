import { ReactNode } from 'react'

interface WindowViewState {
  id: string
  position: WindowViewPosition
  size: WindowViewSize
  content?: ReactNode
}

interface WindowViewPosition {
  x: number
  y: number
}

interface WindowViewSize {
  width: number
  height: number
}

export type { WindowViewState, WindowViewPosition, WindowViewSize }
