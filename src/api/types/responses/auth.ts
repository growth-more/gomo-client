interface LoginResponse {
  id: string
  token: string
}

interface ReissueResponse {
  id: string
  token: string
}

interface OauthResponse {
  userInfo: unknown
  accessToken: string | null
}

export type { LoginResponse, ReissueResponse, OauthResponse }
