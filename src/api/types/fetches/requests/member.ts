// ===================================
// JOIN
// ===================================

import {
  CreateEmailAuthCodeRequest,
  CreateMemberRequest,
  UpdateHandleRequest,
  UpdateMemberRequest,
  UpdatePasswordRequest,
  UpdateProfileImageRequest,
  UpdateQuestPropertyRequest,
} from '@/api/types'

interface CreateMemberFetchRequest {
  body: CreateMemberRequest
}

interface CreateEmailAuthCodeFetchRequest {
  body: CreateEmailAuthCodeRequest
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
}
