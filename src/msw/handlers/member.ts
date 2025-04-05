import { endpoints } from '@/api'
import {
  ProfileResponse,
  QuestPropertyResponse,
  UpdateHandleRequest,
  UpdateMemberRequest,
  UpdatePasswordRequest,
  UpdateProfileImageRequest,
  UpdateQuestPropertyRequest,
} from '@/api/types'
import { mock } from '@/msw/data'
import { delay, http, HttpResponse } from 'msw'

export const member = [
  http.get<never, never, ProfileResponse>(endpoints.member.profile, async () => {
    await delay(1000)
    return HttpResponse.json(mock.member.profile, { status: 200 })
  }),

  http.put<never, UpdateMemberRequest>(endpoints.member.update, async () => {
    await delay(1000)
    return new HttpResponse(null, { status: 204 })
  }),

  http.put<never, UpdateHandleRequest>(endpoints.member.updateHandle, async () => {
    await delay(1000)
    return new HttpResponse(null, { status: 204 })
  }),

  http.put<never, UpdatePasswordRequest>(endpoints.member.updatePassword, async () => {
    await delay(1000)
    return new HttpResponse(null, { status: 204 })
  }),

  http.get<never, never>(endpoints.member.checkHandleDuplicate, async () => {
    await delay(1000)
    return new HttpResponse(null, { status: 200 })
  }),

  http.put<never, UpdateProfileImageRequest>(endpoints.member.updateProfileImage, async () => {
    await delay(1000)
    return new HttpResponse(null, { status: 204 })
  }),

  http.get<never, never, QuestPropertyResponse>(endpoints.member.getQuestProperty, async () => {
    await delay(1000)
    return HttpResponse.json(mock.member.questProperty, { status: 200 })
  }),

  http.put<never, UpdateQuestPropertyRequest>(endpoints.member.updateQuestProperty, async () => {
    await delay(1000)
    return new HttpResponse(null, { status: 204 })
    // return new HttpResponse(null, { status: 400 })
    // return HttpResponse.json(
    //   {
    //     timestamp: '2025-02-18T23:44:11.9820056',
    //     httpStatus: 422,
    //     code: 'INVALID_PARAMETER',
    //     message: 'Quest property content cannot be blank',
    //     path: '/members/quest-properties',
    //   },
    //   { status: 422 }
    // )
  }),
]
