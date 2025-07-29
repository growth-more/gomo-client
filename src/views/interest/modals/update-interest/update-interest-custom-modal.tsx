import { Button } from '@/components/button'
import { ModalView } from '@/components/modal'
import { Stack, Typography } from '@mui/material'
import { useModalStore } from '@/stores/use-modal-store'
import { useInterest } from '@/api/hooks'
import { Interest } from '@/entities/interest'
import { useState } from 'react'
import { SelectInterestColor, SelectInterestImage } from '@/views/interest/components'

export const UPDATE_INTEREST_CUSTOM_MODAL_ID = 'UPDATE_INTEREST_CUSTOM_MODAL'

interface UpdateInterestCustomModalProps {
  interest: Interest
}

export function UpdateInterestCustomModal({ interest }: UpdateInterestCustomModalProps) {
  const [color, setColor] = useState<string | null>(interest.colorCode)
  const [file, setFile] = useState<File | null>(null)

  const { removeModal } = useModalStore()
  const { updateInterest, updateInterestLogo } = useInterest()

  const closeModal = () => {
    removeModal(UPDATE_INTEREST_CUSTOM_MODAL_ID)
  }

  const isChanged = color !== interest.colorCode || file !== null

  const updateColorCode = () => {
    if (color !== interest.colorCode) {
      updateInterest(interest.id, interest.name, color, { onSuccess: closeModal })
    }
    closeModal()
  }

  const submitHandler = () => {
    if (file !== null) {
      updateInterestLogo(interest.id, { updatedLogo: file }, { onSuccess: updateColorCode })
      return
    }
    if (color !== interest.colorCode) {
      updateInterest(interest.id, interest.name, color, { onSuccess: closeModal })
    }
  }

  return (
    <ModalView height={450}>
      <Stack p={2} width={1} height={1} justifyContent="space-between" spacing={2}>
        <Stack spacing={3}>
          <Typography fontSize={18} fontWeight={600} pt={1} noWrap>
            변경할 관심사 로고와 색상을 정해주세요.
          </Typography>
        </Stack>

        <Stack flex={1} spacing={3} alignItems="center" justifyContent="center">
          <SelectInterestImage
            file={file}
            onChange={setFile}
            color={color}
            defaultImageSrc={interest.logoUrl === 'DEFAULT_IMAGE' ? undefined : interest.logoUrl}
            disableRemove
          />
          <SelectInterestColor color={color} onChange={setColor} />
        </Stack>

        <Stack spacing={1}>
          <Button.Primary
            label="관심사 커스텀 변경하기"
            size="large"
            onClick={submitHandler}
            disabled={!isChanged}
          />
          <Button.Plain label="취소" size="small" onClick={closeModal} />
        </Stack>
      </Stack>
    </ModalView>
  )
}
