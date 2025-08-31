import { useRepeatQuest } from '@/api/hooks'
import { Button } from '@/components/button'
import { ModalView } from '@/components/modal'
import { QUEST_TYPE, RepeatQuest } from '@/entities/quest'
import { useModalStore } from '@/stores/use-modal-store'
import { Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'

export const UPDATE_REPEAT_QUEST_NAME_MODAL_ID = 'UPDATE_REPEAT_QUEST_NAME_MODAL'

interface UpdateRepeatQuestNameProps {
  quest: RepeatQuest
}

export function UpdateRepeatQuestNameModal({ quest }: UpdateRepeatQuestNameProps) {
  const { removeModal } = useModalStore()
  const { updateQuest } = useRepeatQuest()

  const [name, setName] = useState(quest.content)

  const closeModal = () => {
    removeModal(UPDATE_REPEAT_QUEST_NAME_MODAL_ID)
  }

  const submitHandler = () => {
    updateQuest(
      quest.id,
      {
        content: name,
        subjectId: quest.subjectId,
        subjectName: quest.subjectName,
        questType: QUEST_TYPE[quest.questType].apiType,
      },
      {
        onSuccess: () => closeModal(),
      }
    )
  }

  return (
    <ModalView height={300}>
      <Stack p={2} width={1} height={1} justifyContent="space-between" spacing={2}>
        <Stack spacing={3}>
          <Typography fontSize={18} fontWeight={600} pt={1} noWrap>
            변경할 반복퀘스트 이름이 무엇인가요?
          </Typography>
          <TextField
            fullWidth
            autoFocus
            label="퀘스트 이름"
            placeholder="변경할 반복퀘스트 이름을 입력해주세요"
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
            label="반복퀘스트 이름 변경하기"
            size="large"
            onClick={submitHandler}
            disabled={name.trim().length === 0 || name === quest.content}
          />
          <Button.Plain label="취소" size="small" onClick={closeModal} />
        </Stack>
      </Stack>
    </ModalView>
  )
}
