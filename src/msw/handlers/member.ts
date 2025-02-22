import { endpoints } from '@/api'
import { ProfileResponse, QuestPropertyResponse } from '@/api/types'
import { mock } from '@/msw/data'
import { http, HttpResponse } from 'msw'

export const member = [
  http.get<never, never, ProfileResponse>(endpoints.member.profile, async () => {
    return HttpResponse.json(mock.member.profile, { status: 200 })
  }),

  http.get<never, never, QuestPropertyResponse>(endpoints.member.getQuestProperty, async () => {
    return HttpResponse.json(mock.member.questProperty, { status: 200 })
  }),
]
