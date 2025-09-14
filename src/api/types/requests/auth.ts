interface LoginRequest {
  email: string
  password: string
}

interface OauthRequest {
  provider: 'google' | 'kakao' | 'naver'
  code: string
}

export type { LoginRequest, OauthRequest }
