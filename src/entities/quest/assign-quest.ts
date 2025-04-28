import { QuestType } from '@/entities/quest/quest-type'

interface AssignQuest {
  id: string
  subjectId: string
  questType: QuestType
  point: number
  score: number
  subjectName: string
  content: string
  proof: string
  startDateTime: Date
  displayOrder: number
  completed: boolean
  confirmed: boolean
}

interface OrganizedAssignQuest {
  completed: AssignQuest[]
  confirmed: AssignQuest[]
  unconfirmed: AssignQuest[]
}

export type { AssignQuest, OrganizedAssignQuest }
