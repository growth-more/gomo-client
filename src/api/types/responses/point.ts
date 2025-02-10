// ===================================
// POINT
// ===================================

interface AvailablePointResponse {
  availablePoints: number
}

interface PointHistoryListResponse {
  historyPoints: {
    pointType: string
    transactionType: string
    points: number
    description: string
    transactionDateTime: Date
  }[]
}

export type { AvailablePointResponse, PointHistoryListResponse }
