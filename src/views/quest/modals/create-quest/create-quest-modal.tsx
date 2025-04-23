import { useAssignQuest } from '@/api/hooks'
import { InvisibleContainer } from '@/components/container'
import { Stepper } from '@/components/stepper'
import { QuestType } from '@/entities'
import { Interest } from '@/entities/interest'
import { useEnter } from '@/hooks'
import { useModalStore } from '@/stores/use-modal-store'
import { CreateQuestModalS1 } from '@/views/quest/modals/create-quest/create-quest-modal-s1'
import { CreateQuestModalS2 } from '@/views/quest/modals/create-quest/create-quest-modal-s2'
import { Dialog, Stack } from '@mui/material'
import { useState } from 'react'

const CREATE_QUEST_STEPS = ['이름 정하기', '관심사 정하기']

export const CREATE_QUEST_MODAL_ID = 'CREATE_QUEST_MODAL'

export interface CreateQuestModalStep {
  onNext?: () => void
  onCancel?: () => void
}

interface CreateQuestModalProps {
  id?: string
  type: QuestType
}

export function CreateQuestModal({ type, id: propsId }: CreateQuestModalProps) {
  const { removeModal } = useModalStore()
  const { createQuest } = useAssignQuest()

  const [step, setStep] = useState(0)

  const [name, setName] = useState<string>('')
  const [interest, setInterest] = useState<Interest | null>(null)

  const modalId = propsId ?? CREATE_QUEST_MODAL_ID

  const closeModal = () => {
    removeModal(modalId)
  }

  useEnter(() => {
    if (step === 0 && name.trim().length > 0) {
      setStep(1)
      return
    }
    if (step === 1 && interest !== null) {
      submit()
      return
    }
  })

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
      {
        onSuccess: () => closeModal(),
      }
    )
  }

  return (
    <Dialog
      open
      sx={{ p: 4 }}
      PaperProps={{
        sx: {
          width: 1,
          height: 1,
          maxWidth: '450px',
          maxHeight: '600px',
        },
      }}
    >
      <Stack p={2} width={1} height={1} spacing={4} overflow="hidden">
        <Stepper step={step} steps={CREATE_QUEST_STEPS} navigable onNavigate={setStep} />
        <InvisibleContainer visible={step === 0} sx={{ height: 1, overflow: 'hidden' }}>
          <CreateQuestModalS1
            name={name}
            setName={setName}
            onNext={() => setStep(1)}
            onCancel={closeModal}
          />
        </InvisibleContainer>
        <InvisibleContainer visible={step === 1} sx={{ height: 1, overflow: 'hidden' }}>
          <CreateQuestModalS2
            interest={interest}
            setInterest={setInterest}
            onNext={submit}
            onCancel={closeModal}
          />
        </InvisibleContainer>
      </Stack>
    </Dialog>
  )
}
