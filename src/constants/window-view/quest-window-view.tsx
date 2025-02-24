import { WindowViewProps } from '@/components/window'
import { QuestPage } from '@/pages'

export const QUEST_PAGE_ID = 'QUEST'

export const QUEST_PAGE_VIEW: Omit<WindowViewProps, 'id'> = {
  title: '퀘스트',
  closable: true,
  resizable: true,
  minWidth: 320,
  minHeight: 350,
  maxWidth: 800,
  maxHeight: 800,
  defaultSize: { width: 320, height: 508 },
  children: <QuestPage />,
}
