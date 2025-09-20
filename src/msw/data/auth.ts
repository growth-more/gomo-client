import { LoginResponse, OauthResponse } from '@/api/types'

const login: LoginResponse = {
  id: 'a10581ce-d721-11ef-a8a5-2508e2a6438b',
  token:
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhMTA1ODFjZS1kNzIxLTExZWYtYThhNS0yNTA4ZTJhNjQzOGIiLCJpYXQiOjE3Mzk4ODk4NDMsImV4cCI6MTczOTg5MDc0M30.51s5omZMIugMjbXg1E01VLm-lGPgyizT2MDKrf74vzc',
}

const oauthGoogle: OauthResponse = {
  userInfo: {
    email: 'gomo@google.com',
    name: '쓸쓸한고라니',
    provider: 'GOOGLE',
  },
  accessToken: null,
}

const oauthKakao: OauthResponse = {
  userInfo: {
    email: 'gomo@kakao.com',
    name: '쓸쓸한고라니',
    provider: 'KAKAO',
  },
  accessToken: null,
}

const oauthNaver: OauthResponse = {
  userInfo: {
    email: 'gomo@naver.com',
    name: '쓸쓸한고라니',
    provider: 'NAVER',
  },
  accessToken: null,
}

export const auth = {
  login,
  oauthGoogle,
  oauthKakao,
  oauthNaver,
}
