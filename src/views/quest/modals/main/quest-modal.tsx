import { MainView } from '@/components/modal'
import { MainViewSidebarMenuGroup } from '@/components/modal/main-view/main-view-sidebar'
import { useState } from 'react'

export const QUEST_MODAL_ID = 'QUEST_MODAL'

export function QuestModal() {
  const [selectedMenuId, setSelectedMenuId] = useState<string>('DAILY_QUEST')

  const sidebar: MainViewSidebarMenuGroup[] = [
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

  return (
    <MainView
      title="퀘스트"
      modalId={QUEST_MODAL_ID}
      sidebar={sidebar}
      selectedMenuId={selectedMenuId}
      onSelected={setSelectedMenuId}
    />
  )
}
