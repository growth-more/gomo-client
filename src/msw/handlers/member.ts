import { endpoints } from '@/api'
import { ProfileResponse, QuestPropertyResponse, UpdateQuestPropertyRequest } from '@/api/types'
import { mock } from '@/msw/data'
import { delay, http, HttpResponse } from 'msw'

export const member = [
  http.get<never, never, ProfileResponse>(endpoints.member.profile, async () => {
    // await delay(10000) // 딜레이 스켈레톤
    return HttpResponse.json(mock.member.profile, { status: 200 })
  }),

  http.get<never, never, QuestPropertyResponse>(endpoints.member.getQuestProperty, async () => {
    return HttpResponse.json(mock.member.questProperty, { status: 200 })
  }),

  http.put<never, UpdateQuestPropertyRequest>(endpoints.member.updateQuestProperty, async () => {
    return new HttpResponse(null, { status: 204 })
  }),
]
