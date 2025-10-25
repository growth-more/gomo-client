import { LoginProvider } from '@/entities/profile'

interface LoginResponse {
  principalId: string
  accessToken: string
}

interface ReissueResponse {
  principalId: string
  accessToken: string
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
