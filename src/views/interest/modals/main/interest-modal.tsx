import { MainView } from '@/components/modal'
import { MainViewSidebarMenuGroup } from '@/components/modal/main-view/main-view-sidebar'
import { InterestModalGraphSection } from '@/views/interest/modals/main/interest-modal-graph-section'
import { useState } from 'react'

export const INTEREST_MODAL_ID = 'INTEREST_MODAL'

export type INTEREST_MODAL_SIDEBAR_MENU_ID = 'INTEREST_GRAPH' | 'MAJOR_INTEREST'

const sidebar: MainViewSidebarMenuGroup<INTEREST_MODAL_SIDEBAR_MENU_ID>[] = [
  {
    menu: [
      {
        id: 'INTEREST_GRAPH',
        label: '전체 관심사',
      },
      {
        id: 'MAJOR_INTEREST',
        label: '주요 관심사',
      },
    ],
  },
]

interface InterestModalProps {
  initMenuId?: INTEREST_MODAL_SIDEBAR_MENU_ID
}

export function InterestModal({ initMenuId = 'INTEREST_GRAPH' }: InterestModalProps) {
  const [selectedMenuId, setSelectedMenuId] = useState<INTEREST_MODAL_SIDEBAR_MENU_ID>(initMenuId)

  return (
    <MainView
      title="관심사"
      sidebar={sidebar}
      modalId={INTEREST_MODAL_ID}
      selectedMenuId={selectedMenuId}
      onSelected={setSelectedMenuId}
    >
      {selectedMenuId === 'INTEREST_GRAPH' && <InterestModalGraphSection />}
    </MainView>
  )
}
