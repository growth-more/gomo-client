import { WindowViewProps } from '@/components/window'
import { QuestEditPage } from '@/pages'
import { AssignQuest } from '@/entities/quest'

export const UPDATE_QUEST_PAGE_ID = (id: string) => `UPDATE_QUEST_${id}`

export const UPDATE_QUEST_PAGE_VIEW = (prevData: AssignQuest): Omit<WindowViewProps, 'id'> => ({
  title: '퀘스트 수정',
  closable: true,
  defaultSize: { width: 350, height: 278 },
  children: <QuestEditPage prevData={prevData} />,
})
