import { WindowViewProps } from '@/components/window'
import { InterestPage } from '@/pages'

export const INTEREST_PAGE_ID = 'INTEREST'

export const INTEREST_PAGE_VIEW: Omit<WindowViewProps, 'id'> = {
  title: '관심사',
  closable: true,
  defaultSize: { width: 600, height: 500 },
  resizable: true,
  children: <InterestPage />,
}
