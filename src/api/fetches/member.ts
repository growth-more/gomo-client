import { AXIOS, endpoints, axiosStatus } from '@/api'
import { ApiError, apiErrorCode, errorCode } from '@/api/error'
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
  VerifyEmailCodeFetchRequest,
} from '@/api/types'

export const member = {
  create: async (params: CreateMemberFetchRequest): Promise<CreateMemberResponse> => {
    return axiosStatus(
      () => AXIOS.post<CreateMemberResponse>(endpoints.member.create, params.body),
      {
        onSuccess: (data) => data,
        onCode: {
          [apiErrorCode.INVALID_PARAMETER]: () =>
            new ApiError(errorCode.auth.join.PASSWORD_INVALID_PARAMETER),
        },
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
      onCode: {
        [apiErrorCode.INVALID_PARAMETER]: () =>
          new ApiError(errorCode.profile.motto.INVALID_PARAMETER),
      },
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
        onCode: {
          [apiErrorCode.EMAIL_DUPLICATED]: () => new ApiError(errorCode.auth.join.EMAIL_DUPLICATED),
        },
      }
    )
  },

  verifyEmailCode: async (params: VerifyEmailCodeFetchRequest): Promise<void> => {
    return axiosStatus(
      () =>
        AXIOS.get(`${endpoints.member.verifyEmailCode}?email=${params.email}&code=${params.code}`),
      {
        onSuccess: (data) => data,
      }
    )
  },

  checkHandleDuplicate: async (params: CheckHandleDuplicateFetchRequest): Promise<void> => {
    return axiosStatus(
      () => AXIOS.get(`${endpoints.member.checkHandleDuplicate}?handle=@${params.handle}`),
      {
        onSuccess: (data) => data,
        onCode: {
          [apiErrorCode.INVALID_PARAMETER]: () =>
            new ApiError(errorCode.profile.handle.INVALID_PARAMETER),
          [apiErrorCode.DUPLICATED]: () => new ApiError(errorCode.profile.handle.DUPLICATED),
        },
      }
    )
  },

  updateHandle: async (params: UpdateHandleFetchRequest): Promise<void> => {
    return axiosStatus(() => AXIOS.put(endpoints.member.updateHandle, params.body), {
      onSuccess: (data) => data,
      onCode: {
        [apiErrorCode.INVALID_PARAMETER]: () =>
          new ApiError(errorCode.profile.handle.INVALID_PARAMETER),
        [apiErrorCode.DUPLICATED]: () => new ApiError(errorCode.profile.handle.DUPLICATED),
      },
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
        onCode: {
          [apiErrorCode.IMAGE_TOO_LARGE]: () =>
            new ApiError(errorCode.profile.image.IMAGE_TOO_LARGE),
        },
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
