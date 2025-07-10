import { endpoints } from '@/api'
import {
  AssignQuestHistoryListResponse,
  AssignQuestListResponse,
  CompleteAssignQuestRequest,
  CreateAssignQuestRequest,
  CreateRepeatQuestRequest,
  RepeatQuestListResponse,
  UpdateAssignQuestRequest,
  UpdateRepeatQuestRequest,
} from '@/api/types'
import { mock } from '@/msw/data'
import { delay, http, HttpResponse } from 'msw'

interface IdParams {
  id: string
}

export const quest = [
  http.get<never, never, AssignQuestListResponse>(endpoints.quest.getAssignQuest, async () => {
    return HttpResponse.json(mock.quest.assignQuest, { status: 200 })
  }),

  http.put<IdParams, CompleteAssignQuestRequest>(endpoints.quest.completeAssignQuest, async () => {
    return new HttpResponse(null, { status: 204 })
    // return new HttpResponse(null, { status: 400 })
  }),

  http.put<IdParams>(endpoints.quest.confirmAssignQuest, async () => {
    return new HttpResponse(null, { status: 204 })
    // return new HttpResponse(null, { status: 400 })
  }),

  http.delete<IdParams>(endpoints.quest.deleteAssignQuest, async () => {
    return new HttpResponse(null, { status: 204 })
    // return new HttpResponse(null, { status: 400 })
  }),

  // TODO: 환경변수 사용하여 에러 조작
  http.post<never, CreateAssignQuestRequest>(endpoints.quest.createAssignQuest, async () => {
    return HttpResponse.json({ id: '01951984-3d19-7bda-a5db-e7a7cde96941' }, { status: 201 })
    // return HttpResponse.json(
    //   {
    //     timestamp: '2025-02-18T23:44:11.5129535',
    //     httpStatus: 422,
    //     code: 'THRESHOLD_EXCEEDED',
    //     // code: 'INVALID_PARAMETER',
    //     message: 'Assign quest threshold exceeded',
    //     path: '/quests/assigns',
    //   },
    //   { status: 422 }
    // )
  }),

  http.put<IdParams, UpdateAssignQuestRequest>(endpoints.quest.updateAssignQuest, async () => {
    return new HttpResponse(null, { status: 204 })
    // return new HttpResponse(null, { status: 400 })
    // return HttpResponse.json(
    //   {
    //     timestamp: '2025-02-18T23:44:13.4974774',
    //     httpStatus: 422,
    //     code: 'INVALID_PARAMETER',
    //     message: 'Quest content cannot be blank',
    //     path: '/quests/assigns/1450177f-d7ff-11ef-830c-233264c36b07',
    //   },
    //   { status: 422 }
    // )
  }),

  http.get<never, never, AssignQuestHistoryListResponse>(
    endpoints.quest.getAssignQuestHistory,
    async () => {
      await delay(2000)
      return HttpResponse.json(mock.quest.assignQuestHistory, { status: 200 })
    }
  ),

  http.get<never, never, RepeatQuestListResponse>(endpoints.quest.getRepeatQuest, async () => {
    return HttpResponse.json(mock.quest.repeatQuest, { status: 200 })
  }),

  http.post<never, CreateRepeatQuestRequest>(endpoints.quest.createRepeatQuest, async () => {
    return HttpResponse.json({ id: '01951984-3d19-7bda-a5db-e7a7cde96941' }, { status: 201 })
    // return HttpResponse.json(
    //   {
    //     timestamp: '2025-02-18T23:44:11.9820056',
    //     httpStatus: 422,
    //     code: 'THRESHOLD_EXCEEDED',
    //     message: 'Repeat quest threshold exceeded',
    //     path: '/quests/repeats',
    //   },
    //   { status: 422 }
    // )
    // return HttpResponse.json(
    //   {
    //     timestamp: '2025-02-18T23:44:11.9820056',
    //     httpStatus: 422,
    //     code: 'INVALID_PARAMETER',
    //     message: 'Repeat quest content cannot be blank',
    //     path: '/quests/repeats',
    //   },
    //   { status: 422 }
    // )
  }),

  http.put<IdParams, UpdateRepeatQuestRequest>(endpoints.quest.updateRepeatQuest, async () => {
    return new HttpResponse(null, { status: 204 })
    // return new HttpResponse(null, { status: 400 })
    // return HttpResponse.json(
    //   {
    //     timestamp: '2025-02-18T23:44:11.9820056',
    //     httpStatus: 422,
    //     code: 'INVALID_PARAMETER',
    //     message: 'Repeat quest content cannot be blank',
    //     path: '/quests/repeats',
    //   },
    //   { status: 422 }
    // )
  }),

  http.delete<IdParams>(endpoints.quest.deleteRepeatQuest, async () => {
    return new HttpResponse(null, { status: 204 })
    // return new HttpResponse(null, { status: 400 })
  }),
]
