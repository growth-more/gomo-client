import {
  CreateEmailAuthCodeRequest,
  CreateMemberRequest,
  UpdateHandleRequest,
  UpdateMemberRequest,
  UpdatePasswordRequest,
  UpdateProfileImageRequest,
  UpdateQuestPropertyRequest,
  UpdateWidgetRequest,
} from '@/api/types'

// ===================================
// JOIN
// ===================================

interface CreateMemberFetchRequest {
  body: CreateMemberRequest
}

interface CreateEmailAuthCodeFetchRequest {
  body: CreateEmailAuthCodeRequest
}

interface VerifyEmailCodeFetchRequest {
  email: string
  code: string
}

// ===================================
// PROFILE
// ===================================

interface UpdateMemberFetchRequest {
  body: UpdateMemberRequest
}

interface UpdatePasswordFetchRequest {
  body: UpdatePasswordRequest
}

interface CheckHandleDuplicateFetchRequest {
  handle: string
}

interface UpdateHandleFetchRequest {
  body: UpdateHandleRequest
}

interface UpdateProfileImageFetchRequest {
  body: UpdateProfileImageRequest
}

interface UpdateWidgetFetchRequest {
  body: UpdateWidgetRequest
}

// ===================================
// QUEST SETTING
// ===================================

interface UpdateQuestPropertyFetchRequest {
  body: UpdateQuestPropertyRequest
}

export type {
  CheckHandleDuplicateFetchRequest,
  CreateEmailAuthCodeFetchRequest,
  CreateMemberFetchRequest,
  UpdateHandleFetchRequest,
  UpdateMemberFetchRequest,
  UpdatePasswordFetchRequest,
  UpdateProfileImageFetchRequest,
  UpdateQuestPropertyFetchRequest,
  UpdateWidgetFetchRequest,
  VerifyEmailCodeFetchRequest,
}
