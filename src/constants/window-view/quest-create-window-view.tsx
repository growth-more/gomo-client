import { WindowViewProps } from '@/components/window'
import { QuestEditPage } from '@/pages'

export const QUEST_CREATE_PAGE_ID = 'QUEST_CREATE'

export const QUEST_CREATE_PAGE_VIEW: Omit<WindowViewProps, 'id'> = {
  title: '퀘스트 생성',
  closable: true,
  defaultSize: { width: 350, height: 278 },
  children: <QuestEditPage />,
}
