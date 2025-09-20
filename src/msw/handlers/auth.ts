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

  http.post(endpoints.auth.reissue, async () => {
    return HttpResponse.json(null, { status: 200 })
    // return HttpResponse.json(null, { status: 401 })
  }),

  http.get(endpoints.auth.oauth.GOOGLE, async () => {
    return HttpResponse.json(mock.auth.oauthGoogle, { status: 200 })
  }),

  http.get(endpoints.auth.oauth.KAKAO, async () => {
    return HttpResponse.json(mock.auth.oauthKakao, { status: 200 })
  }),

  http.get(endpoints.auth.oauth.NAVER, async () => {
    return HttpResponse.json(mock.auth.oauthNaver, { status: 200 })
  }),
]
