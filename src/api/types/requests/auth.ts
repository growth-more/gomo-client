import { OauthProvider } from '@/entities/profile'

interface LoginRequest {
  email: string
  password: string
}

interface OauthRequest {
  provider: OauthProvider
  code: string
}

export type { LoginRequest, OauthRequest }
