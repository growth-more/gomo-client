import { createContext, useContext } from 'react'

interface CalendarContext {
  cellSize: number
  color: string
  emptyColor: string
  thresholds: number[]
  customFn?: (count: number) => string
}

export const CalendarContext = createContext<CalendarContext | null>(null)

export const useHeatmapCalendarContext = () => {
  const context = useContext(CalendarContext)
  if (!context) {
    throw new Error('useHeatmapCalendarContext must be used within a CalendarProvider')
  }
  return context
}
