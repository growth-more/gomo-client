import { WindowViewProps } from '@/components/window'
import { QuestSettingPage } from '@/pages'

export const QUEST_SETTING_PAGE_ID = 'QUEST_SETTING'

export const QUEST_SETTING_PAGE_VIEW: Omit<WindowViewProps, 'id'> = {
  title: '퀘스트 설정',
  closable: true,
  minWidth: 350,
  maxWidth: 800,
  defaultSize: { width: 350, height: 278 },
  children: <QuestSettingPage />,
}
