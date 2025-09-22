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
      preview: () => ReactNode
    }
  >
}

export interface ActiveWidget {
  id: string
  width: number
  height: number
  preview: ReactNode
}

export interface Position {
  row: number
  column: number
}

export interface OverStatus extends Position {
  isPossible: boolean
}

export interface ManagerData {
  id: string
  width: number
  height: number
  row: number
  column: number
  preview: ReactNode
}
