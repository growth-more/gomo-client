import { QuestType } from './quest'

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

export type { AssignQuestHistory, OrganizedAssignQuestHistory }
