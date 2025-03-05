import { CalendarHeatmapType } from '@/components/heatmap/calendar/types'

export const INFO_LABEL: Record<CalendarHeatmapType, string[]> = {
  DAILY: ['일', '월', '화', '수', '목', '금', '토'],
  WEEKLY: ['1주', '2주', '3주', '4주', '5주'],
  MONTHLY: [],
}
