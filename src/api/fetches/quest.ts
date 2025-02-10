import { AXIOS, endpoints } from '@/api'
import {
  AssignQuestHistoryListResponse,
  AssignQuestListResponse,
  CompleteAssignQuestRequest,
  CreateAssignQuestRequest,
  CreateAssignQuestResponse,
  CreateRepeatQuestRequest,
  CreateRepeatQuestResponse,
  RepeatQuestListResponse,
  UpdateAssignQuestOrderRequest,
  UpdateAssignQuestRequest,
  UpdateRepeatQuestOrderRequest,
  UpdateRepeatQuestRequest,
} from '@/api/types'

export const quest = {
  createAssignQuest: async (
    request: CreateAssignQuestRequest
  ): Promise<CreateAssignQuestResponse> => {
    const response = await AXIOS.post<CreateAssignQuestResponse>(
      endpoints.quest.createAssignQuest,
      request
    )
    return response.data
  },

  getAssignQuest: async (): Promise<AssignQuestListResponse> => {
    const response = await AXIOS.get<AssignQuestListResponse>(endpoints.quest.getAssignQuest)
    return response.data
  },

  updateAssignQuest: async (request: UpdateAssignQuestRequest, id: string): Promise<void> => {
    const response = await AXIOS.put(endpoints.quest.updateAssignQuestWithId(id), request)
    return response.data
  },

  deleteAssignQuest: async (id: string): Promise<void> => {
    const response = await AXIOS.delete(endpoints.quest.deleteAssignQuestWithId(id))
    return response.data
  },

  updateAssignQuestOrder: async (request: UpdateAssignQuestOrderRequest): Promise<void> => {
    const response = await AXIOS.put(endpoints.quest.updateAssignQuestOrder, request)
    return response.data
  },

  confirmAssignQuest: async (id: string): Promise<void> => {
    const response = await AXIOS.put(endpoints.quest.confirmAssignQuestWithId(id))
    return response.data
  },

  completeAssignQuest: async (request: CompleteAssignQuestRequest, id: string): Promise<void> => {
    const response = await AXIOS.put(endpoints.quest.completeAssignQuestWithId(id), request)
    return response.data
  },

  getAssignQuestHistory: async (): Promise<AssignQuestHistoryListResponse> => {
    const response = await AXIOS.get<AssignQuestHistoryListResponse>(
      endpoints.quest.getHistoryAssignQuest
    )
    return response.data
  },

  createRepeatQuest: async (
    request: CreateRepeatQuestRequest
  ): Promise<CreateRepeatQuestResponse> => {
    const response = await AXIOS.post<CreateRepeatQuestResponse>(
      endpoints.quest.createRepeatQuest,
      request
    )
    return response.data
  },

  getRepeatQuest: async (): Promise<RepeatQuestListResponse> => {
    const response = await AXIOS.get<RepeatQuestListResponse>(endpoints.quest.getRepeatQuest)
    return response.data
  },

  updateRepeatQuest: async (request: UpdateRepeatQuestRequest, id: string): Promise<void> => {
    const response = await AXIOS.put(endpoints.quest.updateRepeatQuestWithId(id), request)
    return response.data
  },

  deleteRepeatQuest: async (id: string): Promise<void> => {
    const response = await AXIOS.delete(endpoints.quest.deleteRepeatQuestWithId(id))
    return response.data
  },

  updateRepeatQuestOrder: async (request: UpdateRepeatQuestOrderRequest): Promise<void> => {
    const response = await AXIOS.put(endpoints.quest.updateRepeatQuestOrder, request)
    return response.data
  },
}
