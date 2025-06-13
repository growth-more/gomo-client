import { QuestType } from '@/entities/quest'

interface AssignQuestHistory {
  id: string
  questType: QuestType
  subjectName: string
  content: string
  proof: string
  completedDateTime: Date | null
  completed: boolean
}

interface OrganizedAssignQuestHistory {
  date: Date
  history: AssignQuestHistory[]
}

interface DailyTotalAssignQuestHistory {
  date: Date
  dailyCount: number
  weeklyCount: number
  monthlyCount: number
}

export type { AssignQuestHistory, OrganizedAssignQuestHistory, DailyTotalAssignQuestHistory }
