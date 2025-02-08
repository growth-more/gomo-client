// ===================================
// LOGIN
// ===================================

interface LoginResponse {
  accessToken: string
  refreshToken: string
}

// ===================================
// JOIN
// ===================================

interface CreateMemberResponse {
  id: string
}

interface CreateEmailAuthCodeResponse {
  code: string
}

// ===================================
// PROFILE
// ===================================

interface ProfileResponse {
  id: string
  email: string
  handle: string
  name: string
  motto: string
  availablePoints: number
  profileImageUrl: string
  roleType: string
  subscriptionPlan: string
  activateStatus: string
  singUpDateTime: Date
}

interface UpdateProfileImageResponse {
  profileImageUrl: string
  profileImageName: string
}

// ===================================
// QUEST SETTING
// ===================================

interface QuestPropertyResponse {
  dailyThreshold: number
  weeklyThreshold: number
  monthlyMax: number
}

export type {
  CreateEmailAuthCodeResponse,
  CreateMemberResponse,
  LoginResponse,
  QuestPropertyResponse,
  UpdateProfileImageResponse,
  ProfileResponse,
}
