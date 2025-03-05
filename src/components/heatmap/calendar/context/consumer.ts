import { HeatmapCalendarContext } from '@/components/heatmap/calendar/context'
import { useContext } from 'react'

export const useHeatmapCalendarContext = () => {
  const context = useContext(HeatmapCalendarContext)
  if (!context) {
    throw new Error('useHeatmapCalendarContext must be used within a CalendarProvider')
  }
  return context
}
