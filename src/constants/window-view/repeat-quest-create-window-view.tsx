import { WindowViewProps } from '@/components/window'
import { RepeatQuestEditPage } from '@/pages/quest/repeat-quest-edit-page'

export const REPEAT_QUEST_CREATE_PAGE_ID = 'REPEAT_QUEST_CREATE'

export const REPEAT_QUEST_CREATE_PAGE_VIEW: Omit<WindowViewProps, 'id'> = {
  title: '반복 퀘스트 생성',
  closable: true,
  defaultSize: { width: 350, height: 278 },
  children: <RepeatQuestEditPage />,
}
