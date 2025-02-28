import { AXIOS, endpoints, axiosStatus } from '@/api'
import {
  CheckHandleDuplicateFetchRequest,
  CreateEmailAuthCodeFetchRequest,
  CreateEmailAuthCodeResponse,
  CreateMemberFetchRequest,
  CreateMemberResponse,
  ProfileResponse,
  QuestPropertyResponse,
  UpdateHandleFetchRequest,
  UpdateMemberFetchRequest,
  UpdatePasswordFetchRequest,
  UpdateProfileImageFetchRequest,
  UpdateProfileImageResponse,
  UpdateQuestPropertyFetchRequest,
} from '@/api/types'

export const member = {
  create: async (params: CreateMemberFetchRequest): Promise<CreateMemberResponse> => {
    return axiosStatus(
      () => AXIOS.post<CreateMemberResponse>(endpoints.member.create, params.body),
      {
        onSuccess: (data) => data,
      }
    )
  },

  profile: async (): Promise<ProfileResponse> => {
    return axiosStatus(() => AXIOS.get<ProfileResponse>(endpoints.member.profile), {
      onSuccess: (data) => data,
    })
  },

  update: async (params: UpdateMemberFetchRequest): Promise<void> => {
    return axiosStatus(() => AXIOS.put(endpoints.member.update, params.body), {
      onSuccess: (data) => data,
    })
  },

  delete: async (): Promise<void> => {
    return axiosStatus(() => AXIOS.delete(endpoints.member.delete), {
      onSuccess: (data) => data,
    })
  },

  createEmailCode: async (
    params: CreateEmailAuthCodeFetchRequest
  ): Promise<CreateEmailAuthCodeResponse> => {
    return axiosStatus(
      () => AXIOS.post<CreateEmailAuthCodeResponse>(endpoints.member.createEmailCode, params.body),
      {
        onSuccess: (data) => data,
      }
    )
  },

  checkHandleDuplicate: async (params: CheckHandleDuplicateFetchRequest): Promise<void> => {
    return axiosStatus(
      () => AXIOS.post(`${endpoints.member.checkHandleDuplicate}?handle=${params.handle}`),
      {
        onSuccess: (data) => data,
      }
    )
  },

  updateHandle: async (params: UpdateHandleFetchRequest): Promise<void> => {
    return axiosStatus(() => AXIOS.put(endpoints.member.updateHandle, params.body), {
      onSuccess: (data) => data,
    })
  },

  updateProfileImage: async (
    params: UpdateProfileImageFetchRequest
  ): Promise<UpdateProfileImageResponse> => {
    return axiosStatus(
      () =>
        AXIOS.put(endpoints.member.updateProfileImage, params.body, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }),
      {
        onSuccess: (data) => data,
      }
    )
  },

  updatePassword: async (params: UpdatePasswordFetchRequest): Promise<void> => {
    return axiosStatus(() => AXIOS.put(endpoints.member.updatePassword, params.body), {
      onSuccess: (data) => data,
    })
  },

  getQuestProperty: async (): Promise<QuestPropertyResponse> => {
    return axiosStatus(() => AXIOS.get<QuestPropertyResponse>(endpoints.member.getQuestProperty), {
      onSuccess: (data) => data,
    })
  },

  updateQuestProperty: async (params: UpdateQuestPropertyFetchRequest): Promise<void> => {
    return axiosStatus(() => AXIOS.put(endpoints.member.updateQuestProperty, params.body), {
      onSuccess: (data) => data,
    })
  },
}
