import {
  CompleteAssignQuestRequest,
  CreateAssignQuestRequest,
  CreateQuestRequest,
  CreateRepeatQuestRequest,
  UpdateAssignQuestOrderRequest,
  UpdateAssignQuestRequest,
  UpdateRepeatQuestOrderRequest,
  UpdateRepeatQuestRequest,
} from '@/api/types'

// ===================================
// QUEST
// ===================================

interface CreateQuestFetchRequest {
  body: CreateQuestRequest
}

// ===================================
// ASSIGN QUEST
// ===================================

interface CreateAssignQuestFetchRequest {
  body: CreateAssignQuestRequest
}

interface UpdateAssignQuestFetchRequest {
  id: string
  body: UpdateAssignQuestRequest
}

interface UpdateAssignQuestOrderFetchRequest {
  body: UpdateAssignQuestOrderRequest
}

interface CompleteAssignQuestFetchRequest {
  id: string
  body: CompleteAssignQuestRequest
}

interface ConfirmAssignQuestFetchRequest {
  id: string
}

interface DeleteAssignQuestFetchRequest {
  id: string
}

interface AssignQuestHistoryFetchRequest {
  start: Date
  end: Date
  isCompleted: boolean
}

// ===================================
// REPEAT QUEST
// ===================================

interface CreateRepeatQuestFetchRequest {
  body: CreateRepeatQuestRequest
}

interface UpdateRepeatQuestFetchRequest {
  id: string
  body: UpdateRepeatQuestRequest
}

interface UpdateRepeatQuestOrderFetchRequest {
  body: UpdateRepeatQuestOrderRequest
}

interface DeleteRepeatQuestFetchRequest {
  id: string
}

export type {
  AssignQuestHistoryFetchRequest,
  CompleteAssignQuestFetchRequest,
  ConfirmAssignQuestFetchRequest,
  CreateAssignQuestFetchRequest,
  CreateQuestFetchRequest,
  CreateRepeatQuestFetchRequest,
  DeleteAssignQuestFetchRequest,
  DeleteRepeatQuestFetchRequest,
  UpdateAssignQuestFetchRequest,
  UpdateAssignQuestOrderFetchRequest,
  UpdateRepeatQuestFetchRequest,
  UpdateRepeatQuestOrderFetchRequest,
}
