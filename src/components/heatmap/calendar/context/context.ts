import { CalendarHeatmapType } from '@/components/heatmap/calendar/types'
import { createContext } from 'react'

export interface IHeatmapCalendarContext {
  width: number
  height: number
  color: string
  emptyColor: string
  thresholds: number[]
  customFn?: (count: number) => string
  type: CalendarHeatmapType
}

export const HeatmapCalendarContext = createContext<IHeatmapCalendarContext | null>(null)
