interface Streak {
  date: Date
  count: number
}

interface OrganizedStreak {
  all: Streak[]
  daily: Streak[]
  weekly: Streak[]
  monthly: Streak[]
}

type StreakType = 'ALL' | 'DAILY' | 'WEEKLY' | 'MONTHLY'

export type { Streak, OrganizedStreak, StreakType }
