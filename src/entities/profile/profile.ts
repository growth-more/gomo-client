import { WidgetSnapshot } from '@/components/widget'

type LoginProvider = 'EMAIL' | 'GOOGLE' | 'KAKAO' | 'NAVER'
type OauthProvider = Exclude<LoginProvider, 'EMAIL'>

interface Profile {
  id: string
  email: string
  handle: string
  name: string
  motto: string
  availablePoints: number
  profileImageUrl: string
  profileBannerUrl: string
  subscriptionPlan: string
  signUpDateTime: Date
  loginProvider: LoginProvider
  widgetSnapshot: WidgetSnapshot
}

export type { Profile, LoginProvider, OauthProvider }
