import { AXIOS, endpoints } from '@/api'
import {
  CreateEmailAuthCodeRequest,
  CreateEmailAuthCodeResponse,
  CreateMemberRequest,
  CreateMemberResponse,
  ProfileResponse,
  QuestPropertyResponse,
  UpdateHandleRequest,
  UpdateMemberRequest,
  UpdatePasswordRequest,
  UpdateProfileImageRequest,
  UpdateProfileImageResponse,
  UpdateQuestPropertyRequest,
} from '@/api/types'

export const member = {
  create: async (request: CreateMemberRequest): Promise<CreateMemberResponse> => {
    const response = await AXIOS.post<CreateMemberResponse>(endpoints.member.create, request)
    return response.data
  },

  profile: async (): Promise<ProfileResponse> => {
    const response = await AXIOS.get<ProfileResponse>(endpoints.member.profile)
    return response.data
  },

  update: async (request: UpdateMemberRequest): Promise<void> => {
    const response = await AXIOS.put(endpoints.member.update, request)
    return response.data
  },

  delelte: async (): Promise<void> => {
    const response = await AXIOS.delete(endpoints.member.delete)
    return response.data
  },

  createEmailCode: async (
    request: CreateEmailAuthCodeRequest
  ): Promise<CreateEmailAuthCodeResponse> => {
    const response = await AXIOS.post<CreateEmailAuthCodeResponse>(
      endpoints.member.createEmailCode,
      request
    )
    return response.data
  },

  checkHandleDuplicate: async (): Promise<void> => {
    const response = await AXIOS.post(endpoints.member.checkHandleDuplicate)
    return response.data
  },

  updateHandle: async (request: UpdateHandleRequest): Promise<void> => {
    const response = await AXIOS.put(endpoints.member.updateHandle, request)
    return response.data
  },

  updateProfileImage: async (
    request: UpdateProfileImageRequest
  ): Promise<UpdateProfileImageResponse> => {
    const response = await AXIOS.put(endpoints.member.updateProfileImage, request)
    return response.data
  },

  updatePassword: async (request: UpdatePasswordRequest): Promise<void> => {
    const response = await AXIOS.put(endpoints.member.updatePassword, request)
    return response.data
  },

  getQuestProperty: async (): Promise<QuestPropertyResponse> => {
    const response = await AXIOS.get<QuestPropertyResponse>(endpoints.member.getQuestProperty)
    return response.data
  },

  updateQuestProperty: async (request: UpdateQuestPropertyRequest): Promise<void> => {
    const response = await AXIOS.put(endpoints.member.updateQuestProperty, request)
    return response.data
  },
}
