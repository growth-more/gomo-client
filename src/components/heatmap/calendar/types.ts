interface CalenderHeatmapData {
  date: Date
  count: number
}

interface CellData {
  date: Date | null
  count: number
}

type CalendarHeatmapType = 'DAILY' | 'WEEKLY' | 'MONTHLY'

export type { CalenderHeatmapData, CellData, CalendarHeatmapType }
