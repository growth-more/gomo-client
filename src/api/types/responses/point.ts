// ===================================
// POINT
// ===================================

interface AvailablePointResponse {
  availablePoints: number
}

interface HistoryPointListResponse {
  historyPoints: {
    pointType: string
    transactionType: string
    points: number
    description: string
    transactionDateTime: Date
  }[]
}

export type { AvailablePointResponse, HistoryPointListResponse }
