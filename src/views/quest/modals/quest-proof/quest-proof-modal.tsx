import { useAssignQuest } from '@/api/hooks'
import { Button } from '@/components/button'
import { ModalView } from '@/components/modal'
import { useModalStore } from '@/stores/use-modal-store'
import { Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'

export const QUEST_PROOF_MODAL_ID = 'QUEST_PROOF_MODAL'

interface QuestProofModalProps {
  id: string
  onSuccess?: () => void
  onError?: () => void
  onCancel?: () => void
}

export function QuestProofModal({ id, onSuccess, onError, onCancel }: QuestProofModalProps) {
  const { removeModal } = useModalStore()
  const { completeQuest } = useAssignQuest()

  const [proof, setProof] = useState('')

  const closeModal = () => {
    removeModal(QUEST_PROOF_MODAL_ID)
  }

  const submitHandler = () => {
    completeQuest(
      id,
      { proof },
      {
        onSuccess: () => {
          onSuccess?.()
          closeModal()
        },
        onError: () => {
          onError?.()
        },
      }
    )
  }

  const cancelHandler = () => {
    onCancel?.()
    closeModal()
  }

  return (
    <ModalView height={300}>
      <Stack p={2} width={1} height={1} justifyContent="space-between" spacing={2}>
        <Stack spacing={3}>
          <Typography fontSize={18} fontWeight={600} pt={1} noWrap>
            퀘스트 완료 증명 내용을 남겨주세요
          </Typography>
          <TextField
            fullWidth
            autoFocus
            label="퀘스트 완료 증명"
            placeholder="퀘스트 완료 증명 내용을 입력해주세요"
            variant="standard"
            slotProps={{
              inputLabel: { shrink: true },
            }}
            value={proof}
            onChange={(e) => setProof(e.target.value)}
          />
        </Stack>
        <Stack spacing={1}>
          <Button.Primary
            label="퀘스트 완료하기"
            size="large"
            onClick={submitHandler}
            disabled={proof.trim().length === 0}
          />
          <Button.Plain label="취소" size="small" onClick={cancelHandler} />
        </Stack>
      </Stack>
    </ModalView>
  )
}
