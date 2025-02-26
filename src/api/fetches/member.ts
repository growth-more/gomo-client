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
  create: async (props: CreateMemberFetchRequest): Promise<CreateMemberResponse> => {
    return axiosStatus(
      () => AXIOS.post<CreateMemberResponse>(endpoints.member.create, props.body),
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

  update: async (props: UpdateMemberFetchRequest): Promise<void> => {
    return axiosStatus(() => AXIOS.put(endpoints.member.update, props.body), {
      onSuccess: (data) => data,
    })
  },

  delete: async (): Promise<void> => {
    return axiosStatus(() => AXIOS.delete(endpoints.member.delete), {
      onSuccess: (data) => data,
    })
  },

  createEmailCode: async (
    props: CreateEmailAuthCodeFetchRequest
  ): Promise<CreateEmailAuthCodeResponse> => {
    return axiosStatus(
      () => AXIOS.post<CreateEmailAuthCodeResponse>(endpoints.member.createEmailCode, props.body),
      {
        onSuccess: (data) => data,
      }
    )
  },

  checkHandleDuplicate: async (props: CheckHandleDuplicateFetchRequest): Promise<void> => {
    return axiosStatus(
      () => AXIOS.post(`${endpoints.member.checkHandleDuplicate}?handle=${props.handle}`),
      {
        onSuccess: (data) => data,
      }
    )
  },

  updateHandle: async (props: UpdateHandleFetchRequest): Promise<void> => {
    return axiosStatus(() => AXIOS.put(endpoints.member.updateHandle, props.body), {
      onSuccess: (data) => data,
    })
  },

  updateProfileImage: async (
    props: UpdateProfileImageFetchRequest
  ): Promise<UpdateProfileImageResponse> => {
    return axiosStatus(
      () =>
        AXIOS.put(endpoints.member.updateProfileImage, props.body, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }),
      {
        onSuccess: (data) => data,
      }
    )
  },

  updatePassword: async (props: UpdatePasswordFetchRequest): Promise<void> => {
    return axiosStatus(() => AXIOS.put(endpoints.member.updatePassword, props.body), {
      onSuccess: (data) => data,
    })
  },

  getQuestProperty: async (): Promise<QuestPropertyResponse> => {
    return axiosStatus(() => AXIOS.get<QuestPropertyResponse>(endpoints.member.getQuestProperty), {
      onSuccess: (data) => data,
    })
  },

  updateQuestProperty: async (props: UpdateQuestPropertyFetchRequest): Promise<void> => {
    return axiosStatus(() => AXIOS.put(endpoints.member.updateQuestProperty, props.body), {
      onSuccess: (data) => data,
    })
  },
}
