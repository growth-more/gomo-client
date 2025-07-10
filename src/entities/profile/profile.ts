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
  loginProvider: string
}

export type { Profile }
