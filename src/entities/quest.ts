interface AssignQuest {
  id: string
  subjectId: string
  questType: string
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

interface QuestProperty {
  dailyThreshold: number
  weeklyThreshold: number
  monthlyThreshold: number
}

export type { AssignQuest, OrganizedAssignQuest, QuestProperty }
