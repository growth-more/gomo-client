import { MainView } from '@/components/modal'
import { MainViewSidebarMenuGroup } from '@/components/modal/main-view/main-view-sidebar'
import { QuestModalDaily } from '@/views/quest/modals/main/quest-modal-daily'
import { useState } from 'react'

export const QUEST_MODAL_ID = 'QUEST_MODAL'

export type QUEST_MODAL_SIDEBAR_MENU_ID =
  | 'DAILY_QUEST'
  | 'WEEKLY_QUEST'
  | 'MONTHLY_QUEST'
  | 'QUEST_SETTING'

const sidebar: MainViewSidebarMenuGroup<QUEST_MODAL_SIDEBAR_MENU_ID>[] = [
  {
    title: '퀘스트',
    menu: [
      {
        id: 'DAILY_QUEST',
        label: '일일 퀘스트',
      },
      {
        id: 'WEEKLY_QUEST',
        label: '주간 퀘스트',
      },
      {
        id: 'MONTHLY_QUEST',
        label: '월간 퀘스트',
      },
    ],
  },
  {
    title: '퀘스트 설정',
    menu: [
      {
        id: 'QUEST_SETTING',
        label: '퀘스트 설정',
      },
    ],
  },
]

export function QuestModal() {
  const [selectedMenuId, setSelectedMenuId] = useState<QUEST_MODAL_SIDEBAR_MENU_ID>('DAILY_QUEST')

  return (
    <MainView
      title="퀘스트"
      modalId={QUEST_MODAL_ID}
      sidebar={sidebar}
      selectedMenuId={selectedMenuId}
      onSelected={setSelectedMenuId}
    >
      {selectedMenuId === 'DAILY_QUEST' && <QuestModalDaily />}
    </MainView>
  )
}
