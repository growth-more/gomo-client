import { endpoints } from '@/api'
import { mock } from '@/msw/data'
import { http, HttpResponse } from 'msw'

export const auth = [
  http.post(endpoints.auth.login, async () => {
    return HttpResponse.json(mock.auth.login, { status: 200 })
    // return HttpResponse.json(
    //   {
    //     timestamp: '2025-02-18T23:44:04.1578321',
    //     httpStatus: 404,
    //     code: 'NOT_FOUND',
    //     message: 'check email or password',
    //     path: '/members/login',
    //   },
    //   { status: 404 }
    // )
  }),
]
