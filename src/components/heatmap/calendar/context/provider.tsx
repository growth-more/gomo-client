import {
  HeatmapCalendarContext,
  IHeatmapCalendarContext,
} from '@/components/heatmap/calendar/context'
import { ReactNode } from 'react'

interface HeatmapCalendarProviderProps {
  children: ReactNode
  context: IHeatmapCalendarContext
}

export const HeatmapCalendarProvider = ({ children, context }: HeatmapCalendarProviderProps) => {
  return (
    <HeatmapCalendarContext.Provider value={context}>{children}</HeatmapCalendarContext.Provider>
  )
}
