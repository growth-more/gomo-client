import { WidgetData } from '@/components/widget'
import { MyProfileWidget1x1 } from '@/views/profile/widgets/my-profile/my-profile-widget-1x1'

const MyProfileWidget = {
  id: 'MY_PROFILE_WIDGET',
  name: '내 프로필',
  components: {
    S1x1: MyProfileWidget1x1,
  } as const,
} satisfies WidgetData

export default MyProfileWidget
