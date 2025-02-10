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
  quests: {
    id: string
    interestId: string
    questType: string
    point: number
    score: number
    interestName: string
    content: string
    isConfirmed: boolean
    isCompleted: boolean
    proofUrl: string
    startDateTime: Date
    displayOrder: number
  }[]
}

interface AssignQuestHistoryListResponse {
  quests: {
    id: string
    questType: string
    interestName: string
    content: string
    proofUrl: string
    isCompleted: boolean
    completedDateTime: Date
    weekOfYear: number
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
    questType: string
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
