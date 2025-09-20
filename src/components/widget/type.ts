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
