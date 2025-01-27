interface LoginMemberRequest {
  email: string
  password: string
}

interface LoginMemberResponse {
  accessToken: string
  refreshToken: string
}

export type { LoginMemberRequest, LoginMemberResponse }
