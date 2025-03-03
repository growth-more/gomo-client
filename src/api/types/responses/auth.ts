interface LoginResponse {
  id: string
  token: string
}

interface ReissueResponse {
  accessToken: string
}

export type { LoginResponse, ReissueResponse }
