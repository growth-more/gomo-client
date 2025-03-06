import { WindowViewProps } from '@/components/window'
import { ProfilePage } from '@/pages'

export const PROFILE_PAGE_ID = 'PROFILE'

export const PROFILE_PAGE_VIEW: Omit<WindowViewProps, 'id'> = {
  title: '프로필',
  closable: true,
  defaultSize: { width: 550, height: 500 },
  minWidth: 350,
  minHeight: 500,
  maxWidth: 1065,
  resizable: true,
  children: <ProfilePage />,
}
