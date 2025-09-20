import { ReactNode } from 'react'

export interface WidgetData {
  id: string
  name: string
  components: {
    [key: string]: () => ReactNode
  }
}
