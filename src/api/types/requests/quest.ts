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
  memberId: string
  interestId: string
  questType: string
  content: string
}

interface UpdateAssignQuestRequest {
  interestId: string
  questType: string
  content: string
}

interface UpdateAssignQuestOrderRequest {
  questType: string
  updatedOrders: number[]
}

interface CompleteAssignQuestRequest {
  proof: string
}

// ===================================
// REPEAT QUEST
// ===================================

interface CreateRepeatQuestRequest {
  interestId: string
  questType: string
  content: string
}

interface UpdateRepeatQuestRequest {
  interestId: string
  questType: string
  content: string
}

interface UpdateRepeatQuestOrderRequest {
  questType: string
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
