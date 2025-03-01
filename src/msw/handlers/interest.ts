import { endpoints } from '@/api'
import { InterestGraphResponse, InterestListResponse } from '@/api/types'
import { http, HttpResponse } from 'msw'
import { mock } from '@/msw/data'

export const interest = [
  http.get<never, never, InterestListResponse>(endpoints.interest.getList, async () => {
    return HttpResponse.json(mock.interest.list, { status: 200 })
  }),

  http.get<never, never, InterestGraphResponse>(endpoints.interest.getGraph, async () => {
    return HttpResponse.json(mock.interest.graph, { status: 200 })
  }),
]
