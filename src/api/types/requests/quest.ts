import { QuestApiType, QuestType } from '@/entities/quest'

// ===================================
// QUEST
// ===================================

interface CreateQuestRequest {
  type: string
  interestId: number
  content: string
}

// ===================================
// ASSIGN QUEST
// ===================================

interface CreateAssignQuestRequest {
  subjectId: string
  subjectName: string
  questType: QuestType
  content: string
}

interface UpdateAssignQuestRequest {
  subjectId: string
  subjectName: string
  questType: QuestType
  content: string
}

interface UpdateAssignQuestOrderRequest {
  questType: QuestType
  updatedOrders: number[]
}

interface CompleteAssignQuestRequest {
  proof: string
}

// ===================================
// REPEAT QUEST
// ===================================

interface CreateRepeatQuestRequest {
  subjectId: string
  subjectName: string
  questType: QuestApiType
  content: string
}

interface UpdateRepeatQuestRequest {
  subjectId: string
  subjectName: string
  questType: QuestApiType
  content: string
}

interface UpdateRepeatQuestOrderRequest {
  questType: QuestApiType
  updatedOrders: number[]
}

export type {
  CompleteAssignQuestRequest,
  CreateAssignQuestRequest,
  CreateQuestRequest,
  CreateRepeatQuestRequest,
  UpdateAssignQuestOrderRequest,
  UpdateAssignQuestRequest,
  UpdateRepeatQuestOrderRequest,
  UpdateRepeatQuestRequest,
}
