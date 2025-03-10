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

interface QuestProperty {
  dailyThreshold: number
  weeklyThreshold: number
  monthlyThreshold: number
}

type QuestType = 'DAILY' | 'WEEKLY' | 'MONTHLY'

export type {
  AssignQuest,
  RepeatQuest,
  OrganizedAssignQuest,
  OrganizedRepeatQuest,
  QuestProperty,
  QuestType,
  Quest,
}
