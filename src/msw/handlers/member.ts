import { endpoints } from '@/api'
import { ProfileResponse } from '@/api/types'
import { mock } from '@/msw/data'
import { http, HttpResponse } from 'msw'

export const member = [
  http.get<never, never, ProfileResponse>(endpoints.member.profile, async () => {
    return HttpResponse.json(mock.member.profile, { status: 200 })
  }),
]
