import { ReactNode } from 'react'

export interface WidgetData {
  id: string
  name: string
  widgets: Record<
    string,
    {
      width: number
      height: number
      component: () => ReactNode
    }
  >
}

export interface ActiveWidget {
  id: string
  width: number
  height: number
}

export interface Position {
  row: number
  column: number
}

export interface OverStatus extends Position {
  isPossible: boolean
}
