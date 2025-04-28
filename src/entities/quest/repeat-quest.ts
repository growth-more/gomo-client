import { QuestType } from '@/entities/quest/quest-type'

interface RepeatQuest {
  id: string
  subjectId: string
  questType: QuestType
  point: number
  score: number
  subjectName: string
  content: string
  displayOrder: number
}

interface OrganizedRepeatQuest {
  daily: RepeatQuest[]
  weekly: RepeatQuest[]
  monthly: RepeatQuest[]
}

export type { RepeatQuest, OrganizedRepeatQuest }
