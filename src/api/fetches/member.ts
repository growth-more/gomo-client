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
import { axiosStatus } from '@/api/utils'

export const member = {
  create: async (request: CreateMemberRequest): Promise<CreateMemberResponse> => {
    return axiosStatus(() => AXIOS.post<CreateMemberResponse>(endpoints.member.create, request), {
      onSuccess: (data) => data,
    })
  },

  profile: async (): Promise<ProfileResponse> => {
    return axiosStatus(() => AXIOS.get<ProfileResponse>(endpoints.member.profile), {
      onSuccess: (data) => data,
    })
  },

  update: async (request: UpdateMemberRequest): Promise<void> => {
    return axiosStatus(() => AXIOS.put(endpoints.member.update, request), {
      onSuccess: (data) => data,
    })
  },

  delete: async (): Promise<void> => {
    return axiosStatus(() => AXIOS.delete(endpoints.member.delete), {
      onSuccess: (data) => data,
    })
  },

  createEmailCode: async (
    request: CreateEmailAuthCodeRequest
  ): Promise<CreateEmailAuthCodeResponse> => {
    return axiosStatus(
      () => AXIOS.post<CreateEmailAuthCodeResponse>(endpoints.member.createEmailCode, request),
      {
        onSuccess: (data) => data,
      }
    )
  },

  checkHandleDuplicate: async (): Promise<void> => {
    return axiosStatus(() => AXIOS.post(endpoints.member.checkHandleDuplicate), {
      onSuccess: (data) => data,
    })
  },

  updateHandle: async (request: UpdateHandleRequest): Promise<void> => {
    return axiosStatus(() => AXIOS.put(endpoints.member.updateHandle, request), {
      onSuccess: (data) => data,
    })
  },

  updateProfileImage: async (
    request: UpdateProfileImageRequest
  ): Promise<UpdateProfileImageResponse> => {
    return axiosStatus(() => AXIOS.put(endpoints.member.updateProfileImage, request), {
      onSuccess: (data) => data,
    })
  },

  updatePassword: async (request: UpdatePasswordRequest): Promise<void> => {
    return axiosStatus(() => AXIOS.put(endpoints.member.updatePassword, request), {
      onSuccess: (data) => data,
    })
  },

  getQuestProperty: async (): Promise<QuestPropertyResponse> => {
    return axiosStatus(() => AXIOS.get<QuestPropertyResponse>(endpoints.member.getQuestProperty), {
      onSuccess: (data) => data,
    })
  },

  updateQuestProperty: async (request: UpdateQuestPropertyRequest): Promise<void> => {
    return axiosStatus(() => AXIOS.put(endpoints.member.updateQuestProperty, request), {
      onSuccess: (data) => data,
    })
  },
}
