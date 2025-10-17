// ===================================
// JOIN
// ===================================

interface CreateMemberRequest {
  email: string
  password: string
  handle: string
  name: string
  motto: string
}

interface CreateEmailAuthCodeRequest {
  email: string
}

// ===================================
// PROFILE
// ===================================

interface UpdateMemberRequest {
  name: string
  motto: string
}

interface UpdatePasswordRequest {
  originPassword: string
  updatedPassword: string
}

interface UpdateHandleRequest {
  handle: string
}

interface UpdateProfileImageRequest {
  profileImage: File
}

interface UpdateWidgetRequest {
  snapshot: string
}

// ===================================
// QUEST SETTING
// ===================================

interface UpdateQuestPropertyRequest {
  dailyThreshold: number
  weeklyThreshold: number
  monthlyThreshold: number
}

export type {
  CreateEmailAuthCodeRequest,
  CreateMemberRequest,
  UpdateHandleRequest,
  UpdateMemberRequest,
  UpdatePasswordRequest,
  UpdateProfileImageRequest,
  UpdateQuestPropertyRequest,
  UpdateWidgetRequest,
}
