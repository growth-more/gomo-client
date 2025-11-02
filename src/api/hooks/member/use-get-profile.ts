import { fetches } from '@/api'
import { endpoints } from '@/api'
import { WidgetSnapshot } from '@/components/widget'
import { LoginProvider, Profile } from '@/entities/profile'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useGetProfile() {
  const { data, isLoading } = useQuery({
    queryKey: ['GET', endpoints.member.profile],
    queryFn: fetches.member.profile,
  })

  const profile = useMemo<Profile>(() => {
    if (!data) {
      return {
        id: '',
        email: '',
        handle: '',
        name: '',
        motto: '',
        availablePoints: 0,
        profileImageUrl: '',
        profileBannerUrl: '',
        subscriptionPlan: '',
        signUpDateTime: new Date(),
        loginProvider: 'EMAIL',
        widgetSnapshot: {
          mediaWidth1: [],
          mediaWidth2: [],
          mediaWidth3: [],
        },
      }
    }
    return {
      id: data.id,
      email: data.email,
      handle: data.handle,
      name: data.name,
      motto: data.motto,
      availablePoints: data.availablePoints,
      profileImageUrl: data.profileImageUrl,
      profileBannerUrl: data.profileBannerUrl,
      subscriptionPlan: data.subscriptionPlan,
      signUpDateTime: data.signUpDateTime,
      loginProvider: data.loginProvider as LoginProvider,
      widgetSnapshot: JSON.parse(data.widgetSnapshot) as WidgetSnapshot,
    }
  }, [data])

  return { profile, isLoading }
}
