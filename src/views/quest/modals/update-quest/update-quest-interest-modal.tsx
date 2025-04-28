import { useAssignQuest, useInterest } from '@/api/hooks'
import { Button } from '@/components/button'
import { ModalView } from '@/components/modal'
import { AssignQuest } from '@/entities'
import { Interest } from '@/entities/interest'
import { useModalStore } from '@/stores/use-modal-store'
import { SelectInterest } from '@/views/interest/components'
import { Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

export const UPDATE_QUEST_INTEREST_MODAL_ID = 'UPDATE_QUEST_INTEREST_MODAL'

interface UpdateQuestInterestModalProps {
  quest: AssignQuest
}

export function UpdateQuestInterestModal({ quest }: UpdateQuestInterestModalProps) {
  const { removeModal } = useModalStore()
  const { updateQuest } = useAssignQuest()
  const { interestList } = useInterest()

  const [interest, setInterest] = useState<Interest | null>(null)

  const closeModal = () => {
    removeModal(UPDATE_QUEST_INTEREST_MODAL_ID)
  }

  const submitHandler = () => {
    if (!interest) {
      return
    }

    updateQuest(
      quest.id,
      {
        content: quest.content,
        questType: quest.questType,
        subjectId: interest?.id,
        subjectName: interest?.name,
      },
      {
        onSuccess: () => closeModal(),
      }
    )
  }

  useEffect(() => {
    setInterest(interestList.find((interest) => interest.id === quest.subjectId) ?? null)
  }, [interestList, quest.subjectId])

  return (
    <ModalView height={500}>
      <Stack p={2} height={1} justifyContent="space-between" spacing={2}>
        <Stack spacing={3} flex={1} overflow="hidden">
          <Typography fontSize={18} fontWeight={600} noWrap pt={1}>
            어떤 관심사로 변경할까요?
          </Typography>
          <SelectInterest selected={interest} onChanged={setInterest} sx={{ height: 1 }} />
        </Stack>

        <Stack spacing={1}>
          <Button.Primary
            label="퀘스트 관심사 변경하기"
            size="large"
            onClick={submitHandler}
            disabled={interest === null || quest.subjectId === interest.id}
          />
          <Button.Plain label="취소" size="small" onClick={closeModal} />
        </Stack>
      </Stack>
    </ModalView>
  )
}
