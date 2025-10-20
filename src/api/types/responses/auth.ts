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
  principal: {
    email: string
    name: string
    loginProvider: LoginProvider
  }
  accessToken: string | null
}

export type { LoginResponse, ReissueResponse, OauthResponse }
