import { endpoints } from '@/api'
import { AssignQuestListResponse } from '@/api/types'
import { mock } from '@/msw/data'
import { http, HttpResponse } from 'msw'

export const quest = [
  http.get<never, never, AssignQuestListResponse>(endpoints.quest.getAssignQuest, async () => {
    return HttpResponse.json(mock.quest.assignQuest, { status: 200 })
  }),
]
