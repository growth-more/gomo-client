import { useInterest } from '@/api/hooks'
import { Button } from '@/components/button'
import { ModalView } from '@/components/modal'
import { Interest } from '@/entities/interest'
import { useModalStore } from '@/stores/use-modal-store'
import { Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'

export const UPDATE_INTEREST_NAME_MODAL_ID = 'UPDATE_INTEREST_NAME_MODAL'

interface UpdateInterestNameModalProps {
  interest: Interest
}

export function UpdateInterestNameModal({ interest }: UpdateInterestNameModalProps) {
  const { removeModal } = useModalStore()
  const { updateInterest } = useInterest()

  const [name, setName] = useState(interest.name)

  const isSubmitDisabled = name.trim().length === 0 || name === interest.name

  const closeModal = () => {
    removeModal(UPDATE_INTEREST_NAME_MODAL_ID)
  }

  const submitHandler = () => {
    if (isSubmitDisabled) {
      return
    }
    updateInterest(interest.id, name, interest.colorCode, { onSuccess: closeModal })
  }

  return (
    <ModalView height={300}>
      <Stack p={2} width={1} height={1} justifyContent="space-between" spacing={2}>
        <Stack spacing={3}>
          <Typography fontSize={18} fontWeight={600} pt={1} noWrap>
            변경할 관심사 이름이 무엇인가요?
          </Typography>
          <TextField
            fullWidth
            autoFocus
            label="관심사 이름"
            placeholder="변경할 관심사 이름을 입력해주세요"
            variant="standard"
            slotProps={{
              inputLabel: { shrink: true },
            }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Stack>
        <Stack spacing={1}>
          <Button.Primary
            label="관심사 이름 변경하기"
            size="large"
            onClick={submitHandler}
            disabled={isSubmitDisabled}
          />
          <Button.Plain label="취소" size="small" onClick={closeModal} />
        </Stack>
      </Stack>
    </ModalView>
  )
}
