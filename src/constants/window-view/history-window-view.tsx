import { WindowViewProps } from '@/components/window'
import { HistoryPage } from '@/pages'

export const HISTORY_PAGE_ID = 'HISTORY'

export const HISTORY_PAGE_VIEW: Omit<WindowViewProps, 'id'> = {
  title: '기록',
  closable: true,
  defaultSize: { width: 600, height: 500 },
  resizable: true,
  children: <HistoryPage />,
}
