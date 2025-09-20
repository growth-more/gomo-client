import { LoginProvider } from '@/entities/profile'

interface LoginResponse {
  id: string
  token: string
}

interface ReissueResponse {
  id: string
  token: string
}

interface OauthResponse {
  userInfo: {
    email: string
    name: string
    provider: LoginProvider
  }
  accessToken: string | null
}

export type { LoginResponse, ReissueResponse, OauthResponse }
