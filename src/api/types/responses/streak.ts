// ===================================
// STREAK
// ===================================

interface StreakListResponse {
  streakType: string
  streaks: {
    filledDateTime: Date
    weekOfYear: number
    completedQuestCount: number
  }[]
}

export type { StreakListResponse }
