import { endpoints, axiosFetch } from '@/api'
import { apiErrorCode, errorCode } from '@/api/error'
import {
  AssignQuestHistoryFetchRequest,
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
import dayjs from 'dayjs'

export const quest = {
  createAssignQuest: async (
    params: CreateAssignQuestFetchRequest
  ): Promise<CreateAssignQuestResponse> => {
    return axiosFetch.post(endpoints.quest.createAssignQuest, params.body, {
      onCode: {
        [apiErrorCode.THRESHOLD_EXCEEDED]: errorCode.quest.create.THRESHOLD_EXCEEDED,
        [apiErrorCode.INVALID_PARAMETER]: errorCode.quest.create.INVALID_PARAMETER,
      },
    })
  },

  getAssignQuest: async (): Promise<AssignQuestListResponse> => {
    return axiosFetch.get(endpoints.quest.getAssignQuest)
  },

  updateAssignQuest: async (params: UpdateAssignQuestFetchRequest): Promise<void> => {
    return axiosFetch.put(endpoints.quest.updateAssignQuestWithId(params.id), params.body, {
      onCode: {
        [apiErrorCode.INVALID_PARAMETER]: errorCode.quest.update.INVALID_PARAMETER,
      },
    })
  },

  deleteAssignQuest: async (params: DeleteAssignQuestFetchRequest): Promise<void> => {
    return axiosFetch.delete(endpoints.quest.deleteAssignQuestWithId(params.id))
  },

  updateAssignQuestOrder: async (params: UpdateAssignQuestOrderFetchRequest): Promise<void> => {
    return axiosFetch.put(endpoints.quest.updateAssignQuestOrder, params.body)
  },

  confirmAssignQuest: async (params: ConfirmAssignQuestFetchRequest): Promise<void> => {
    return axiosFetch.put(endpoints.quest.confirmAssignQuestWithId(params.id))
  },

  completeAssignQuest: async (params: CompleteAssignQuestFetchRequest): Promise<void> => {
    return axiosFetch.put(endpoints.quest.completeAssignQuestWithId(params.id), params.body)
  },

  getAssignQuestHistory: async (
    params: AssignQuestHistoryFetchRequest
  ): Promise<AssignQuestHistoryListResponse> => {
    const startDateTime = dayjs(params.start).format('YYYY-MM-DDTHH:mm:ss.SSS')
    const endDateTime = dayjs(params.end).format('YYYY-MM-DDTHH:mm:ss.SSS')

    return axiosFetch.get(
      `${endpoints.quest.getAssignQuestHistory}?startDateTime=${startDateTime}&endDateTime=${endDateTime}&isCompleted=${params.isCompleted}`
    )
  },

  createRepeatQuest: async (
    params: CreateRepeatQuestFetchRequest
  ): Promise<CreateRepeatQuestResponse> => {
    return axiosFetch.post(endpoints.quest.createRepeatQuest, params.body)
  },

  getRepeatQuest: async (): Promise<RepeatQuestListResponse> => {
    return axiosFetch.get(endpoints.quest.getRepeatQuest)
  },

  updateRepeatQuest: async (params: UpdateRepeatQuestFetchRequest): Promise<void> => {
    return axiosFetch.put(endpoints.quest.updateRepeatQuestWithId(params.id), params.body, {
      onCode: {
        [apiErrorCode.INVALID_PARAMETER]: errorCode.quest.repeat.update.INVALID_PARAMETER,
      },
    })
  },

  deleteRepeatQuest: async (params: DeleteRepeatQuestFetchRequest): Promise<void> => {
    return axiosFetch.delete(endpoints.quest.deleteRepeatQuestWithId(params.id))
  },

  updateRepeatQuestOrder: async (params: UpdateRepeatQuestOrderFetchRequest): Promise<void> => {
    return axiosFetch.put(endpoints.quest.updateRepeatQuestOrder, params.body)
  },
}
