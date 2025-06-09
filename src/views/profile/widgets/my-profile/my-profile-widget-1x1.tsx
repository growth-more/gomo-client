import { Widget } from '@/components/widget'
import { useGetProfile } from '@/api/hooks/member/use-get-profile'
import { Motto, ProfileInfo } from '@/views/profile/components'
import { Divider, Stack } from '@mui/material'
import { PROFILE_MODAL_ID } from '@/views/profile/modals'
import { useModalStore } from '@/stores/use-modal-store'
import { ProfileModal } from '@/views/profile/modals'

export function MyProfileWidget1x1() {
  const { profile } = useGetProfile()
  const { addModal } = useModalStore()

  const openProfileModal = () => {
    addModal(PROFILE_MODAL_ID, <ProfileModal />)
  }

  return (
    <Widget width={1} disableTitle sx={{ p: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Stack
        spacing={2}
        p={1}
        sx={{ '&:hover': { bgcolor: (theme) => theme.palette.background.main }, cursor: 'pointer' }}
        borderRadius={1}
        onClick={openProfileModal}
      >
        <ProfileInfo profile={profile} />
        <Motto motto={profile.motto} />
      </Stack>
      <Divider />
    </Widget>
  )
}
