import { endpoints } from '@/api'
import { StreakListResponse } from '@/api/types'
import { mock } from '@/msw/data'
import { http, HttpResponse } from 'msw'

export const streak = [
  http.get<never, never, StreakListResponse>(endpoints.streak.getStreak, async () => {
    return HttpResponse.json(mock.streak.list, { status: 200 })
  }),
]
