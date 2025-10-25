import { endpoints, axiosFetch } from '@/api'
import { apiErrorCode, errorCode } from '@/api/error'
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
  UpdateWidgetFetchRequest,
  VerifyEmailCodeFetchRequest,
  WidgetResponse,
} from '@/api/types'

export const member = {
  create: async (params: CreateMemberFetchRequest): Promise<CreateMemberResponse> => {
    return axiosFetch.post(endpoints.member.create, params.body, {
      onCode: {
        [apiErrorCode.INVALID_PARAMETER]: errorCode.auth.join.PASSWORD_INVALID_PARAMETER,
      },
    })
  },

  profile: async (): Promise<ProfileResponse> => {
    return axiosFetch.get(endpoints.member.profile)
  },

  update: async (params: UpdateMemberFetchRequest): Promise<void> => {
    return axiosFetch.put(endpoints.member.update, params.body, {
      onCode: {
        [apiErrorCode.INVALID_PARAMETER]: errorCode.profile.motto.INVALID_PARAMETER,
      },
    })
  },

  delete: async (): Promise<void> => {
    return axiosFetch.delete(endpoints.member.delete)
  },

  createEmailCode: async (
    params: CreateEmailAuthCodeFetchRequest
  ): Promise<CreateEmailAuthCodeResponse> => {
    return axiosFetch.post(endpoints.member.createEmailCode, params.body, {
      onCode: {
        [apiErrorCode.EMAIL_DUPLICATED]: errorCode.auth.join.EMAIL_DUPLICATED,
      },
    })
  },

  verifyEmailCode: async (params: VerifyEmailCodeFetchRequest): Promise<void> => {
    return axiosFetch.get(
      `${endpoints.member.verifyEmailCode}?email=${params.email}&code=${params.code}`
    )
  },

  checkHandleDuplicate: async (params: CheckHandleDuplicateFetchRequest): Promise<void> => {
    return axiosFetch.get(`${endpoints.member.checkHandleDuplicate}?handle=@${params.handle}`, {
      onCode: {
        [apiErrorCode.INVALID_PARAMETER]: errorCode.profile.handle.INVALID_PARAMETER,
        [apiErrorCode.DUPLICATED]: errorCode.profile.handle.DUPLICATED,
      },
    })
  },

  updateHandle: async (params: UpdateHandleFetchRequest): Promise<void> => {
    return axiosFetch.put(endpoints.member.updateHandle, params.body, {
      onCode: {
        [apiErrorCode.INVALID_PARAMETER]: errorCode.profile.handle.INVALID_PARAMETER,
        [apiErrorCode.DUPLICATED]: errorCode.profile.handle.DUPLICATED,
      },
    })
  },

  updateProfileImage: async (
    params: UpdateProfileImageFetchRequest
  ): Promise<UpdateProfileImageResponse> => {
    return axiosFetch.putForm(endpoints.member.updateProfileImage, params.body, {
      onCode: {
        [apiErrorCode.IMAGE_TOO_LARGE]: errorCode.profile.image.IMAGE_TOO_LARGE,
      },
    })
  },

  updatePassword: async (params: UpdatePasswordFetchRequest): Promise<void> => {
    return axiosFetch.put(endpoints.member.updatePassword, params.body)
  },

  getQuestProperty: async (): Promise<QuestPropertyResponse> => {
    return axiosFetch.get(endpoints.member.getQuestProperty)
  },

  updateQuestProperty: async (params: UpdateQuestPropertyFetchRequest): Promise<void> => {
    return axiosFetch.put(endpoints.member.updateQuestProperty, params.body)
  },

  getWidget: async (): Promise<WidgetResponse> => {
    return axiosFetch.get(endpoints.member.getWidget)
  },

  updateWidget: async (params: UpdateWidgetFetchRequest): Promise<void> => {
    return axiosFetch.put(endpoints.member.updateWidget, params.body)
  },
}
