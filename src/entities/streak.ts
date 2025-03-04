interface Streak {
  date: Date
  count: number
}

interface OrganizedStreak {
  daily: Streak[]
  weekly: Streak[]
  monthly: Streak[]
}

export type { Streak, OrganizedStreak }
