import { ProfileResponse, QuestPropertyResponse, WidgetResponse } from '@/api/types'

const profile: Omit<ProfileResponse, 'signUpDateTime'> & { signUpDateTime: string } = {
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
  signUpDateTime: '2023-03-20T20:36:37.591469',
  widgetSnapshot:
    '{"mediaWidth1":[{"id":"MY_PROFILE_WIDGET","width":1,"height":1,"row":0,"column":0},{"id":"CONFIRMED_QUEST_WIDGET","width":1,"height":1,"row":1,"column":0},{"id":"UNCONFIRMED_QUEST_WIDGET","width":1,"height":1,"row":2,"column":0},{"id":"QUEST_HISTORY_WIDGET","width":1,"height":1,"row":3,"column":0},{"id":"INTEREST_GRAPH_WIDGET","width":1,"height":1,"row":4,"column":0},{"id":"DAILY_QUEST_WIDGET","width":1,"height":1,"row":5,"column":0},{"id":"WEEKLY_QUEST_WIDGET","width":1,"height":1,"row":6,"column":0},{"id":"MONTHLY_QUEST_WIDGET","width":1,"height":1,"row":7,"column":0}],"mediaWidth2":[{"id":"MY_PROFILE_WIDGET","width":1,"height":1,"row":0,"column":0},{"id":"CONFIRMED_QUEST_WIDGET","width":1,"height":1,"row":0,"column":1},{"id":"UNCONFIRMED_QUEST_WIDGET","width":2,"height":1,"row":1,"column":0},{"id":"QUEST_HISTORY_WIDGET","width":1,"height":1,"row":2,"column":0},{"id":"INTEREST_GRAPH_WIDGET","width":1,"height":1,"row":2,"column":1},{"id":"DAILY_QUEST_WIDGET","width":2,"height":1,"row":3,"column":0},{"id":"WEEKLY_QUEST_WIDGET","width":1,"height":1,"row":4,"column":0},{"id":"MONTHLY_QUEST_WIDGET","width":1,"height":1,"row":4,"column":1}],"mediaWidth3":[{"id":"MY_PROFILE_WIDGET","width":1,"height":1,"row":0,"column":0},{"id":"CONFIRMED_QUEST_WIDGET","width":2,"height":1,"row":0,"column":1},{"id":"UNCONFIRMED_QUEST_WIDGET","width":2,"height":1,"row":1,"column":0},{"id":"INTEREST_GRAPH_WIDGET","width":1,"height":1,"row":1,"column":2},{"id":"QUEST_STREAK_WIDGET","width":3,"height":1,"row":2,"column":0},{"id":"DAILY_QUEST_WIDGET","width":1,"height":1,"row":3,"column":0},{"id":"MONTHLY_QUEST_WIDGET","width":1,"height":1,"row":3,"column":2},{"id":"WEEKLY_QUEST_WIDGET","width":1,"height":1,"row":3,"column":1}]}',
}

const questProperty: QuestPropertyResponse = {
  dailyThreshold: 7,
  weeklyThreshold: 11,
  monthlyThreshold: 23,
}

const widget: WidgetResponse = {
  snapshot:
    '{"mediaWidth1":[{"id":"MY_PROFILE_WIDGET","width":1,"height":1,"row":0,"column":0},{"id":"CONFIRMED_QUEST_WIDGET","width":1,"height":1,"row":1,"column":0},{"id":"UNCONFIRMED_QUEST_WIDGET","width":1,"height":1,"row":2,"column":0},{"id":"QUEST_HISTORY_WIDGET","width":1,"height":1,"row":3,"column":0},{"id":"INTEREST_GRAPH_WIDGET","width":1,"height":1,"row":4,"column":0},{"id":"DAILY_QUEST_WIDGET","width":1,"height":1,"row":5,"column":0},{"id":"WEEKLY_QUEST_WIDGET","width":1,"height":1,"row":6,"column":0},{"id":"MONTHLY_QUEST_WIDGET","width":1,"height":1,"row":7,"column":0}],"mediaWidth2":[{"id":"MY_PROFILE_WIDGET","width":1,"height":1,"row":0,"column":0},{"id":"CONFIRMED_QUEST_WIDGET","width":1,"height":1,"row":0,"column":1},{"id":"UNCONFIRMED_QUEST_WIDGET","width":2,"height":1,"row":1,"column":0},{"id":"QUEST_HISTORY_WIDGET","width":1,"height":1,"row":2,"column":0},{"id":"INTEREST_GRAPH_WIDGET","width":1,"height":1,"row":2,"column":1},{"id":"DAILY_QUEST_WIDGET","width":2,"height":1,"row":3,"column":0},{"id":"WEEKLY_QUEST_WIDGET","width":1,"height":1,"row":4,"column":0},{"id":"MONTHLY_QUEST_WIDGET","width":1,"height":1,"row":4,"column":1}],"mediaWidth3":[{"id":"MY_PROFILE_WIDGET","width":1,"height":1,"row":0,"column":0},{"id":"CONFIRMED_QUEST_WIDGET","width":2,"height":1,"row":0,"column":1},{"id":"UNCONFIRMED_QUEST_WIDGET","width":2,"height":1,"row":1,"column":0},{"id":"INTEREST_GRAPH_WIDGET","width":1,"height":1,"row":1,"column":2},{"id":"QUEST_STREAK_WIDGET","width":3,"height":1,"row":2,"column":0},{"id":"DAILY_QUEST_WIDGET","width":1,"height":1,"row":3,"column":0},{"id":"MONTHLY_QUEST_WIDGET","width":1,"height":1,"row":3,"column":2},{"id":"WEEKLY_QUEST_WIDGET","width":1,"height":1,"row":3,"column":1}]}',
}

export const member = {
  profile,
  questProperty,
  widget,
}
