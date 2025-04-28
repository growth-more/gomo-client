import { QuestType } from '@/entities/quest/quest-type'

interface Quest {
  id: string
  subjectId: string
  subjectName: string
  questType: QuestType
  point: number
  score: number
  content: string
  displayOrder: number
}

interface QuestProperty {
  dailyThreshold: number
  weeklyThreshold: number
  monthlyThreshold: number
}

export type { QuestProperty, Quest }
