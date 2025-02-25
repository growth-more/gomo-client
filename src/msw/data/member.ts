import { ProfileResponse, QuestPropertyResponse } from '@/api/types'

const profile: ProfileResponse = {
  id: 'a10581ce-d721-11ef-a8a5-2508e2a6438b',
  email: 'gomotest@naver.com',
  handle: '@GOMOTEST',
  name: 'gomotest',
  motto: 'gomotest fighting!',
  availablePoints: 1660,
  profileImageUrl: 'https://mini-cloud/gomotest-profile',
  loginProvider: 'EMAIL',
  roleType: 'ROLE_MEMBER',
  subscriptionPlan: 'FREE',
  activateStatus: 'ACTIVE',
  signUpDateTime: new Date('2025-01-20T20:36:37.591469'),
}

const questProperty: QuestPropertyResponse = {
  dailyThreshold: 7,
  weeklyThreshold: 11,
  monthlyThreshold: 23,
}

export const member = {
  profile,
  questProperty,
}
