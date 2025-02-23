import { endpoints } from '@/api'
import { AssignQuestListResponse, CompleteAssignQuestRequest } from '@/api/types'
import { mock } from '@/msw/data'
import { http, HttpResponse } from 'msw'

interface IdParams {
  id: string
}

export const quest = [
  http.get<never, never, AssignQuestListResponse>(endpoints.quest.getAssignQuest, async () => {
    return HttpResponse.json(mock.quest.assignQuest, { status: 200 })
  }),

  http.put<IdParams, CompleteAssignQuestRequest, never>(
    endpoints.quest.completeAssignQuest,
    async () => {
      return new HttpResponse(null, { status: 204 })
    }
  ),

  http.put<IdParams>(endpoints.quest.confirmAssignQuest, async () => {
    return new HttpResponse(null, { status: 204 })
  }),

  http.delete<IdParams>(endpoints.quest.deleteAssignQuest, async () => {
    return new HttpResponse(null, { status: 204 })
  }),
]
