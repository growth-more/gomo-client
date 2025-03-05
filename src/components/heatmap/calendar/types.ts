interface CalenderHeatmapData {
  date: Date
  count: number
}

interface CellData {
  date: Date | null
  count: number
}

export type { CalenderHeatmapData, CellData }
