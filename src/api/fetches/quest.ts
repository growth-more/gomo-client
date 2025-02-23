import { AXIOS, endpoints, axiosStatus } from '@/api'
import {
  AssignQuestHistoryListResponse,
  AssignQuestListResponse,
  CompleteAssignQuestFetchRequest,
  ConfirmAssignQuestFetchRequest,
  CreateAssignQuestFetchRequest,
  CreateAssignQuestResponse,
  CreateRepeatQuestFetchRequest,
  CreateRepeatQuestResponse,
  DeleteAssignQuestFetchRequest,
  DeleteRepeatQuestFetchRequest,
  RepeatQuestListResponse,
  UpdateAssignQuestFetchRequest,
  UpdateAssignQuestOrderFetchRequest,
  UpdateRepeatQuestFetchRequest,
  UpdateRepeatQuestOrderFetchRequest,
} from '@/api/types'

export const quest = {
  createAssignQuest: async (
    params: CreateAssignQuestFetchRequest
  ): Promise<CreateAssignQuestResponse> => {
    return axiosStatus(
      () => AXIOS.post<CreateAssignQuestResponse>(endpoints.quest.createAssignQuest, params.body),
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

  updateAssignQuest: async (params: UpdateAssignQuestFetchRequest): Promise<void> => {
    return axiosStatus(
      () => AXIOS.put(endpoints.quest.updateAssignQuestWithId(params.id), params.body),
      {
        onSuccess: (data) => data,
      }
    )
  },

  deleteAssignQuest: async (params: DeleteAssignQuestFetchRequest): Promise<void> => {
    return axiosStatus(() => AXIOS.delete(endpoints.quest.deleteAssignQuestWithId(params.id)), {
      onSuccess: (data) => data,
    })
  },

  updateAssignQuestOrder: async (params: UpdateAssignQuestOrderFetchRequest): Promise<void> => {
    return axiosStatus(() => AXIOS.put(endpoints.quest.updateAssignQuestOrder, params.body), {
      onSuccess: (data) => data,
    })
  },

  confirmAssignQuest: async (params: ConfirmAssignQuestFetchRequest): Promise<void> => {
    return axiosStatus(() => AXIOS.put(endpoints.quest.confirmAssignQuestWithId(params.id)), {
      onSuccess: (data) => data,
    })
  },

  completeAssignQuest: async (params: CompleteAssignQuestFetchRequest): Promise<void> => {
    return axiosStatus(
      () => AXIOS.put(endpoints.quest.completeAssignQuestWithId(params.id), params.body),
      {
        onSuccess: (data) => data,
      }
    )
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
    params: CreateRepeatQuestFetchRequest
  ): Promise<CreateRepeatQuestResponse> => {
    return axiosStatus(
      () => AXIOS.post<CreateRepeatQuestResponse>(endpoints.quest.createRepeatQuest, params.body),
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

  updateRepeatQuest: async (params: UpdateRepeatQuestFetchRequest): Promise<void> => {
    return axiosStatus(
      () => AXIOS.put(endpoints.quest.updateRepeatQuestWithId(params.id), params.body),
      {
        onSuccess: (data) => data,
      }
    )
  },

  deleteRepeatQuest: async (params: DeleteRepeatQuestFetchRequest): Promise<void> => {
    return axiosStatus(() => AXIOS.delete(endpoints.quest.deleteRepeatQuestWithId(params.id)), {
      onSuccess: (data) => data,
    })
  },

  updateRepeatQuestOrder: async (params: UpdateRepeatQuestOrderFetchRequest): Promise<void> => {
    return axiosStatus(() => AXIOS.put(endpoints.quest.updateRepeatQuestOrder, params.body), {
      onSuccess: (data) => data,
    })
  },
}
