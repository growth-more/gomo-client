import { WindowViewProps } from '@/components/window'
import { RepeatQuest } from '@/entities/quest'
import { RepeatQuestEditPage } from '@/pages/quest/repeat-quest-edit-page'

export const REPEAT_QUEST_UPDATE_PAGE_ID = (id: string) => `REPEAT_QUEST_UPDATE_${id}`

export const REPEAT_QUEST_UPDATE_PAGE_VIEW = (
  prevData: RepeatQuest
): Omit<WindowViewProps, 'id'> => ({
  title: '반복 퀘스트 수정',
  closable: true,
  defaultSize: { width: 350, height: 278 },
  children: <RepeatQuestEditPage prevData={prevData} />,
})
