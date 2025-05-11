import { useRepeatQuest } from '@/api/hooks'
import { ModalView } from '@/components/modal'
import { Stepper } from '@/components/stepper'
import { QuestType } from '@/entities/quest'
import { Interest } from '@/entities/interest'
import { useModalStore } from '@/stores/use-modal-store'
import { CreateQuestModalS1 } from '@/views/quest/modals/create-quest/create-quest-modal-s1'
import { CreateQuestModalS2 } from '@/views/quest/modals/create-quest/create-quest-modal-s2'
import { Stack } from '@mui/material'
import { useState } from 'react'

const CREATE_QUEST_STEPS = ['이름 정하기', '관심사 정하기']

export const CREATE_REPEAT_QUEST_MODAL_ID = 'CREATE_REPEAT_QUEST_MODAL'

export interface CreateRepeatQuestModalStep {
  onNext?: () => void
  onCancel?: () => void
}

interface CreateRepeatQuestModalProps {
  id?: string
  type: QuestType
}

export function CreateRepeatQuestModal({ type, id: propsId }: CreateRepeatQuestModalProps) {
  const { removeModal } = useModalStore()
  const { createQuest } = useRepeatQuest()

  const [step, setStep] = useState(0)

  const [name, setName] = useState<string>('')
  const [interest, setInterest] = useState<Interest | null>(null)

  const modalId = propsId ?? CREATE_REPEAT_QUEST_MODAL_ID

  const closeModal = () => {
    removeModal(modalId)
  }

  const submit = () => {
    if (interest === null) {
      return
    }

    createQuest(
      {
        content: name,
        questType: type,
        subjectId: interest.id,
        subjectName: interest.name,
      },
      { onSuccess: () => closeModal() }
    )
  }

  return (
    <ModalView>
      <Stack p={2} width={1} height={1} spacing={4} overflow="hidden">
        <Stepper step={step} steps={CREATE_QUEST_STEPS} navigable onNavigate={setStep} />
        {step === 0 && (
          <CreateQuestModalS1
            name={name}
            setName={setName}
            onNext={() => setStep(1)}
            onCancel={closeModal}
          />
        )}
        {step === 1 && (
          <CreateQuestModalS2
            interest={interest}
            setInterest={setInterest}
            onNext={submit}
            onCancel={closeModal}
          />
        )}
      </Stack>
    </ModalView>
  )
}
