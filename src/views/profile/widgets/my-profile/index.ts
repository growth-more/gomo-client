import { WidgetData } from '@/components/widget'
import { MyProfileWidget1x1 } from '@/views/profile/widgets/my-profile/my-profile-widget-1x1'

export const MyProfileWidget = {
  id: 'MY_PROFILE_WIDGET',
  name: '내 프로필',
  widgets: {
    S1x1: {
      width: 1,
      height: 1,
      component: MyProfileWidget1x1,
    },
  } as const,
} satisfies WidgetData
