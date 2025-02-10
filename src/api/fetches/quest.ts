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
import { axiosStatus } from '@/api/utils'

export const quest = {
  createAssignQuest: async (
    request: CreateAssignQuestRequest
  ): Promise<CreateAssignQuestResponse> => {
    return axiosStatus(
      () => AXIOS.post<CreateAssignQuestResponse>(endpoints.quest.createAssignQuest, request),
      {
        onSuccess: (data) => data,
      }
    )
  },

  getAssignQuest: async (): Promise<AssignQuestListResponse> => {
    return axiosStatus(() => AXIOS.get<AssignQuestListResponse>(endpoints.quest.getAssignQuest), {
      onSuccess: (data) => data,
    })
  },

  updateAssignQuest: async (request: UpdateAssignQuestRequest, id: string): Promise<void> => {
    return axiosStatus(() => AXIOS.put(endpoints.quest.updateAssignQuestWithId(id), request), {
      onSuccess: (data) => data,
    })
  },

  deleteAssignQuest: async (id: string): Promise<void> => {
    return axiosStatus(() => AXIOS.delete(endpoints.quest.deleteAssignQuestWithId(id)), {
      onSuccess: (data) => data,
    })
  },

  updateAssignQuestOrder: async (request: UpdateAssignQuestOrderRequest): Promise<void> => {
    return axiosStatus(() => AXIOS.put(endpoints.quest.updateAssignQuestOrder, request), {
      onSuccess: (data) => data,
    })
  },

  confirmAssignQuest: async (id: string): Promise<void> => {
    return axiosStatus(() => AXIOS.put(endpoints.quest.confirmAssignQuestWithId(id)), {
      onSuccess: (data) => data,
    })
  },

  completeAssignQuest: async (request: CompleteAssignQuestRequest, id: string): Promise<void> => {
    return axiosStatus(() => AXIOS.put(endpoints.quest.completeAssignQuestWithId(id), request), {
      onSuccess: (data) => data,
    })
  },

  getAssignQuestHistory: async (): Promise<AssignQuestHistoryListResponse> => {
    return axiosStatus(
      () => AXIOS.get<AssignQuestHistoryListResponse>(endpoints.quest.getHistoryAssignQuest),
      {
        onSuccess: (data) => data,
      }
    )
  },

  createRepeatQuest: async (
    request: CreateRepeatQuestRequest
  ): Promise<CreateRepeatQuestResponse> => {
    return axiosStatus(
      () => AXIOS.post<CreateRepeatQuestResponse>(endpoints.quest.createRepeatQuest, request),
      {
        onSuccess: (data) => data,
      }
    )
  },

  getRepeatQuest: async (): Promise<RepeatQuestListResponse> => {
    return axiosStatus(() => AXIOS.get<RepeatQuestListResponse>(endpoints.quest.getRepeatQuest), {
      onSuccess: (data) => data,
    })
  },

  updateRepeatQuest: async (request: UpdateRepeatQuestRequest, id: string): Promise<void> => {
    return axiosStatus(() => AXIOS.put(endpoints.quest.updateRepeatQuestWithId(id), request), {
      onSuccess: (data) => data,
    })
  },

  deleteRepeatQuest: async (id: string): Promise<void> => {
    return axiosStatus(() => AXIOS.delete(endpoints.quest.deleteRepeatQuestWithId(id)), {
      onSuccess: (data) => data,
    })
  },

  updateRepeatQuestOrder: async (request: UpdateRepeatQuestOrderRequest): Promise<void> => {
    return axiosStatus(() => AXIOS.put(endpoints.quest.updateRepeatQuestOrder, request), {
      onSuccess: (data) => data,
    })
  },
}
