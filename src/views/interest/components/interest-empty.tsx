import { Iconify } from '@/components/iconify'
import { useModalStore } from '@/stores/use-modal-store'
import { CREATE_INTEREST_MODAL_ID, CreateInterestModal } from '@/views/interest/modals'
import { Button, Stack, Typography } from '@mui/material'

export function InterestEmpty() {
  const { addModal } = useModalStore()

  const createInterestHandler = () => {
    addModal(CREATE_INTEREST_MODAL_ID, <CreateInterestModal />)
  }

  return (
    <Stack
      width={1}
      height={1}
      alignItems="center"
      justifyContent="center"
      spacing={1}
      bgcolor={(theme) => theme.palette.background.light}
      border={1}
      borderRadius={1}
      borderColor={(theme) => theme.palette.divider}
      sx={{ borderStyle: 'dashed' }}
    >
      <Iconify icon="material-symbols-light:folder-open-outline-rounded" width={50} />
      <Stack spacing={2} alignItems="center">
        <Stack alignItems="center">
          <Typography fontSize={16} fontWeight={500} color="text.secondary">
            관심사가 없습니다.
          </Typography>
          <Typography fontSize={12} fontWeight={400} color="text.secondary">
            관심사를 추가해서 퀘스트를 관리해보세요.
          </Typography>
        </Stack>
        <Button onClick={createInterestHandler}>관심사 추가하기</Button>
      </Stack>
    </Stack>
  )
}
