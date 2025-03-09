import { endpoints } from '@/api'
import {
  CreateInterestRequest,
  CreateInterestResponse,
  CreateMajorInterestResponse,
  InterestGraphResponse,
  InterestListResponse,
  MajorInterestResponse,
} from '@/api/types'
import { http, HttpResponse } from 'msw'
import { mock } from '@/msw/data'

interface IdParams {
  id: string
}

export const interest = [
  http.get<never, never, InterestListResponse>(endpoints.interest.getList, async () => {
    return HttpResponse.json(mock.interest.list, { status: 200 })
  }),

  http.get<never, never, InterestGraphResponse>(endpoints.interest.getGraph, async () => {
    return HttpResponse.json(mock.interest.graph, { status: 200 })
  }),

  http.post<never, CreateInterestRequest, CreateInterestResponse>(
    endpoints.interest.create,
    async () => {
      return HttpResponse.json(mock.interest.create, { status: 200 })
    }
  ),

  http.delete<IdParams>(endpoints.interest.delete, async () => {
    return new HttpResponse(null, { status: 204 })
  }),

  http.get<never, never, MajorInterestResponse>(endpoints.interest.getMajorInterest, async () => {
    return HttpResponse.json(mock.interest.major, { status: 200 })
  }),

  http.post<never, IdParams, CreateMajorInterestResponse>(
    endpoints.interest.createMajorInterest,
    async () => {
      return HttpResponse.json(mock.interest.createMajor, { status: 200 })
    }
  ),

  http.delete<IdParams>(endpoints.interest.deleteMajorInterest, async () => {
    return new HttpResponse(null, { status: 204 })
  }),
]
