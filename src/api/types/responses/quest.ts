import { QuestType } from '@/entities'

// ===================================
// QUEST
// ===================================

interface CreateQuestResponse {
  id: string
}

// ===================================
// ASSIGN QUEST
// ===================================

interface CreateAssignQuestResponse {
  id: string
}

interface AssignQuestListResponse {
  dailyQuests: {
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
  }[]
  weeklyQuests: {
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
  }[]
  monthlyQuests: {
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
  }[]
}

interface AssignQuestHistoryListResponse {
  assignQuests: {
    id: string
    questType: QuestType
    subjectName: string
    content: string
    proof: string
    completedDateTime: Date | null
    completed: boolean
  }[]
}

// ===================================
// REPEAT QUEST
// ===================================

interface CreateRepeatQuestResponse {
  id: string
}

interface RepeatQuestListResponse {
  repeatQuests: {
    id: string
    questType: QuestType
    interestName: string
    content: string
    displayOrder: number
  }[]
}

export type {
  AssignQuestHistoryListResponse,
  AssignQuestListResponse,
  CreateAssignQuestResponse,
  CreateQuestResponse,
  CreateRepeatQuestResponse,
  RepeatQuestListResponse,
}
