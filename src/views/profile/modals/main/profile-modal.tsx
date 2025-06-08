import { useGetProfile } from '@/api/hooks'
import { MainView } from '@/components/modal'
import { MainViewSidebarMenuGroup } from '@/components/modal/main-view/main-view-sidebar'
import { MyProfileSection } from '@/views/profile/modals/main/my-profile-section'
import { useState } from 'react'

export const PROFILE_MODAL_ID = 'PROFILE_MODAL'

export type PROFILE_MODAL_SIDEBAR_MENU_ID = 'MY_PROFILE'

const SIDEBAR_MENU: MainViewSidebarMenuGroup<PROFILE_MODAL_SIDEBAR_MENU_ID>[] = [
  {
    menu: [
      {
        id: 'MY_PROFILE',
        label: '내 프로필',
      },
    ],
  },
]

interface ProfileModalProps {
  initMenuId?: PROFILE_MODAL_SIDEBAR_MENU_ID
}

export function ProfileModal({ initMenuId = 'MY_PROFILE' }: ProfileModalProps) {
  const { profile } = useGetProfile()

  const [selectedMenuId, setSelectedMenuId] = useState<PROFILE_MODAL_SIDEBAR_MENU_ID>(initMenuId)

  return (
    <MainView
      title="내 프로필"
      subtitle={profile.name}
      modalId={PROFILE_MODAL_ID}
      sidebar={SIDEBAR_MENU}
      selectedMenuId={selectedMenuId}
      onSelected={setSelectedMenuId}
    >
      {selectedMenuId === 'MY_PROFILE' && <MyProfileSection profile={profile} />}
    </MainView>
  )
}
