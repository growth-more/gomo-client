import { createContext } from 'react'

export interface IHeatmapCalendarContext {
  cellSize: number
  color: string
  emptyColor: string
  thresholds: number[]
  customFn?: (count: number) => string
}

export const HeatmapCalendarContext = createContext<IHeatmapCalendarContext | null>(null)
