// ===================================
// STREAK
// ===================================

interface StreakListResponse {
  dailyStreaks: {
    id: string
    streakType: string
    filledDate: Date
    completedQuestCount: number
  }[]
  weeklyStreaks: {
    id: string
    streakType: string
    filledDate: Date
    completedQuestCount: number
  }[]
  monthlyStreaks: {
    id: string
    streakType: string
    filledDate: Date
    completedQuestCount: number
  }[]
}

export type { StreakListResponse }
