import { ReactNode } from 'react'

export interface WidgetComponentProps {
  width: number
  height: number
}

export interface Widget {
  id: string
  name: string
  description?: string
  sizes: {
    width: number
    height: number
    component: () => ReactNode
    preview: () => ReactNode
  }[]
  render: (width: number, height: number) => ReactNode
}

export interface WidgetCategory {
  name: string
  widgets: Widget[]
}

// legacy
export interface WidgetData {
  id: string
  name: string
  description?: string
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
  widgetId: string
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

export interface ManagerData {
  id: string
  widgetId: string
  width: number
  height: number
  row: number
  column: number
}

export interface WidgetApiData {
  id: string
  width: number
  height: number
  row: number
  column: number
}

export interface WidgetSnapshot {
  mediaWidth1: WidgetApiData[]
  mediaWidth2: WidgetApiData[]
  mediaWidth3: WidgetApiData[]
}
