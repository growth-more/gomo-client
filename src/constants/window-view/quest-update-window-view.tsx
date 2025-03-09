import { WindowViewProps } from '@/components/window'
import { QuestEditPage } from '@/pages'
import { Quest } from '@/entities'

export const UPDATE_QUEST_PAGE_ID = (id: string) => `UPDATE_QUEST_${id}`

export const UPDATE_QUEST_PAGE_VIEW = (prevData: Quest): Omit<WindowViewProps, 'id'> => ({
  title: '퀘스트 수정',
  closable: true,
  defaultSize: { width: 350, height: 278 },
  children: <QuestEditPage prevData={prevData} />,
})
