import { Widget } from '@/components/widget'
import { MyProfileWidget1x1 } from '@/views/profile/widgets/my-profile/my-profile-widget-1x1'
import { MyProfileWidget1x1Preview } from '@/views/profile/widgets/my-profile/my-profile-widget-1x1-preview'

export const myProfileWidget: Widget = {
  id: 'MY_PROFILE_WIDGET',
  name: '내 프로필',
  sizes: [
    {
      width: 1,
      height: 1,
      component: MyProfileWidget1x1,
      preview: MyProfileWidget1x1Preview,
    },
  ],
  render: (width: number, height: number) => {
    if (width === 1 && height === 1) {
      return <MyProfileWidget1x1 />
    }
    return null
  },
}
