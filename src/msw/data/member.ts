import { ProfileResponse, QuestPropertyResponse } from '@/api/types'

const profile: ProfileResponse = {
  id: 'a10581ce-d721-11ef-a8a5-2508e2a6438b',
  email: 'gomo@naver.com',
  handle: '@gorani',
  name: '쓸쓸한고라니',
  motto: '매일매일 반복하고 또 반복하자!',
  availablePoints: 1660,
  profileImageUrl: 'https://mini-cloud/gomotest-profile',
  profileBannerUrl: 'https://mini-cloud/gomotest-profile-banner',
  loginProvider: 'EMAIL',
  roleType: 'ROLE_MEMBER',
  subscriptionPlan: 'FREE',
  activateStatus: 'ACTIVE',
  signUpDateTime: new Date('2023-03-20T20:36:37.591469'),
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
