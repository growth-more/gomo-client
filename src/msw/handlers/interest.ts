import { endpoints } from '@/api'
import {
  CreateInterestEdgeRequest,
  CreateInterestRequest,
  UpdateInterestLogoRequest,
  UpdateInterestRequest,
} from '@/api/types'
import { http, HttpResponse } from 'msw'
import { mock } from '@/msw/data'

interface IdParams {
  id: string
}

export const interest = [
  http.get<never, never>(endpoints.interest.getList, async () => {
    return HttpResponse.json(mock.interest.list, { status: 200 })
    // return HttpResponse.json({ interests: [] }, { status: 200 })
  }),

  http.get<never, never>(endpoints.interest.getGraph, async () => {
    return HttpResponse.json(mock.interest.graph, { status: 200 })
  }),

  http.post<never, CreateInterestRequest>(endpoints.interest.create, async () => {
    return HttpResponse.json(mock.interest.create, { status: 200 })

    // return new HttpResponse(null, { status: 400 })

    // return HttpResponse.json(
    //   {
    //     timestamp: '2025-02-12T20:25:27.015343',
    //     httpStatus: 422,
    //     code: 'IMAGE_TOO_LARGE',
    //     message: 'Maximum upload size exceeded',
    //     path: '/interests',
    //   },
    //   { status: 422 }
    // )

    // return HttpResponse.json(
    //   {
    //     timestamp: '2025-04-05T15:04:20.368951',
    //     httpStatus: 422,
    //     code: 'INVALID_PARAMETER',
    //     message: 'Invalid parameter',
    //     path: '/interests',
    //   },
    //   { status: 422 }
    // )
  }),

  http.put<IdParams, UpdateInterestRequest>(endpoints.interest.update, async () => {
    return new HttpResponse(null, { status: 204 })

    // return new HttpResponse(null, { status: 422 })

    // return HttpResponse.json(
    //   {
    //     timestamp: '2025-04-05T15:04:20.368951',
    //     httpStatus: 422,
    //     code: 'INVALID_PARAMETER',
    //     message: 'Invalid parameter',
    //     path: '/interests',
    //   },
    //   { status: 422 }
    // )
  }),

  http.put<IdParams, UpdateInterestLogoRequest>(endpoints.interest.updateLogo, async () => {
    return new HttpResponse(null, { status: 204 })

    // return new HttpResponse(null, { status: 400 })

    // return HttpResponse.json(
    //   {
    //     timestamp: '2025-04-05T15:04:20.368951',
    //     httpStatus: 422,
    //     code: 'IMAGE_TOO_LARGE',
    //     message: 'Maximum upload size exceeded',
    //     path: '/interests/logo',
    //   },
    //   { status: 422 }
    // )
  }),

  http.delete<IdParams>(endpoints.interest.delete, async () => {
    return new HttpResponse(null, { status: 204 })
    // return new HttpResponse(null, { status: 400 }}
  }),

  http.post<never, CreateInterestEdgeRequest>(endpoints.interest.createEdge, async () => {
    return new HttpResponse(null, { status: 204 })
    // return new HttpResponse(null, { status: 400 })
  }),

  http.delete<IdParams>(endpoints.interest.deleteEdge, async () => {
    return new HttpResponse(null, { status: 204 })
    // return new HttpResponse(null, { status: 400 })
  }),

  http.get<never, never>(endpoints.interest.getMajorInterest, async () => {
    return HttpResponse.json(mock.interest.major, { status: 200 })
  }),

  http.post<never, IdParams>(endpoints.interest.createMajorInterest, async () => {
    return HttpResponse.json(mock.interest.createMajor, { status: 200 })
    // return new HttpResponse(null, { status: 400 })
    // return HttpResponse.json(
    //   {
    //     timestamp: '2025-04-05T15:04:20.368951',
    //     httpStatus: 422,
    //     code: 'DUPLICATED',
    //     message: 'Duplicated',
    //     path: '/interests/major',
    //   },
    //   { status: 422 }
    // )
  }),

  http.delete<IdParams>(endpoints.interest.deleteMajorInterest, async () => {
    return new HttpResponse(null, { status: 204 })
    // return new HttpResponse(null, { status: 400 })
  }),
]
