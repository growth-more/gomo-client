import { WidgetComponentProps } from '@/components/widget'
import { MyProfileWidget1x1 } from '@/views/profile/widgets/my-profile/my-profile-widget-1x1'

export function MyProfileWidget({ width, height }: WidgetComponentProps) {
  if (width === 1 && height === 1) {
    return <MyProfileWidget1x1 />
  }
  return null
}
