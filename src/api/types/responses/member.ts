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
  profileBannerUrl: string
  loginProvider: string
  roleType: string
  subscriptionPlan: string
  activateStatus: string
  signUpDateTime: Date
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
  monthlyThreshold: number
}

export type {
  CreateEmailAuthCodeResponse,
  CreateMemberResponse,
  QuestPropertyResponse,
  UpdateProfileImageResponse,
  ProfileResponse,
}
