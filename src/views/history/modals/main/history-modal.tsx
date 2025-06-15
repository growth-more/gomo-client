import { MainView } from '@/components/modal'
import { MainViewSidebarMenuGroup } from '@/components/modal/main-view/main-view-sidebar'
import { HistoryStreakSection } from '@/views/history/modals/main/history-streak-section'
import { ListHistorySection } from '@/views/history/modals/main/list-history-section'
import { useState } from 'react'

export const HISTORY_MODAL_ID = 'HISTORY_MODAL'

export type HISTORY_MODAL_SIDEBAR_MENU_ID = 'HISTORY_LIST' | 'HISTORY_CALENDAR' | 'HISTORY_STREAK'

const SIDEBAR_MENU: MainViewSidebarMenuGroup<HISTORY_MODAL_SIDEBAR_MENU_ID>[] = [
  {
    menu: [
      {
        id: 'HISTORY_LIST',
        label: '리스트 기록',
      },
      // {
      //   id: 'HISTORY_CALENDAR',
      //   label: '캘린더 기록',
      // },
      {
        id: 'HISTORY_STREAK',
        label: '연속 퀘스트 기록',
      },
    ],
  },
]

interface HistoryModalProps {
  initMenuId?: HISTORY_MODAL_SIDEBAR_MENU_ID
}

export function HistoryModal({ initMenuId = 'HISTORY_LIST' }: HistoryModalProps) {
  const [selectedMenuId, setSelectedMenuId] = useState<HISTORY_MODAL_SIDEBAR_MENU_ID>(initMenuId)

  return (
    <MainView
      title="퀘스트 기록"
      modalId={HISTORY_MODAL_ID}
      sidebar={SIDEBAR_MENU}
      selectedMenuId={selectedMenuId}
      onSelected={setSelectedMenuId}
    >
      {selectedMenuId === 'HISTORY_LIST' && <ListHistorySection />}
      {selectedMenuId === 'HISTORY_STREAK' && <HistoryStreakSection />}
    </MainView>
  )
}
