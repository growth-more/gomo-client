import { WindowViewProps } from '@/components/window'
import { InterestPage } from '@/pages'

export const INTEREST_PAGE_ID = 'INTEREST'

export const INTEREST_PAGE_VIEW: Omit<WindowViewProps, 'id'> = {
  title: '관심사',
  closable: true,
  defaultSize: { width: 900, height: 600 },
  minWidth: 500,
  minHeight: 400,
  resizable: true,
  children: <InterestPage />,
}
