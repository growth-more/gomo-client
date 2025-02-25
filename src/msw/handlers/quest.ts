import { endpoints } from '@/api'
import {
  AssignQuestListResponse,
  CompleteAssignQuestRequest,
  CreateAssignQuestRequest,
  UpdateAssignQuestRequest,
} from '@/api/types'
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

  // TODO: 환경변수 사용하여 에러 조작
  http.post<never, CreateAssignQuestRequest, never>(endpoints.quest.createAssignQuest, async () => {
    return HttpResponse.json({ id: '01951984-3d19-7bda-a5db-e7a7cde96941' }, { status: 201 })
    // return HttpResponse.json(
    //   {
    //     timestamp: '2025-02-18T23:44:11.5129535',
    //     httpStatus: 422,
    //     code: 'THRESHOLD_EXCEEDED',
    //     message: 'Assign quest threshold exceeded',
    //     path: '/quests/assigns',
    //   },
    //   { status: 422 }
    // )
  }),

  http.put<IdParams, UpdateAssignQuestRequest, never>(
    endpoints.quest.updateAssignQuest,
    async () => {
      return new HttpResponse(null, { status: 204 })
    }
  ),
]
