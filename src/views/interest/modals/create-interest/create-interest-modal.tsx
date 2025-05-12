import { useInterest } from '@/api/hooks'
import { ModalView } from '@/components/modal'
import { Stepper } from '@/components/stepper'
import { Interest } from '@/entities/interest'
import { useModalStore } from '@/stores/use-modal-store'
import { CreateInterestModalS1 } from '@/views/interest/modals/create-interest/create-interest-modal-s1'
import { CreateInterestModalS2 } from '@/views/interest/modals/create-interest/create-interest-modal-s2'
import { CreateInterestModalS3 } from '@/views/interest/modals/create-interest/create-interest-modal-s3'
import { Stack } from '@mui/material'
import { useState } from 'react'

const CREATE_INTEREST_STEPS = ['이름 정하기', '관계 정하기', '커스텀 디자인']

export const CREATE_INTEREST_MODAL_ID = 'CREATE_INTEREST_MODAL'

export interface CreateInterestModalStep {
  onNext?: () => void
  onCancel?: () => void
}

interface CreateInterestModalProps {
  id?: string
}

export function CreateInterestModal({ id: propsId }: CreateInterestModalProps) {
  const { createInterest } = useInterest()
  const { removeModal } = useModalStore()

  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [interest, setInterest] = useState<Interest | null>(null)
  const [color, setColor] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)

  const modalId = propsId ?? CREATE_INTEREST_MODAL_ID

  const closeModal = () => {
    removeModal(modalId)
  }

  const submit = () => {
    if (!file || !name) {
      return
    }
    createInterest(
      {
        name: name,
        colorCode: color ?? '#000000',
        logo: file,
        upperInterestId: interest?.id,
      },
      {
        onSuccess: closeModal,
      }
    )
  }

  return (
    <ModalView>
      <Stack p={2} width={1} height={1} spacing={4} overflow="hidden">
        <Stepper step={step} steps={CREATE_INTEREST_STEPS} navigable onNavigate={setStep} />
        {step === 0 && (
          <CreateInterestModalS1
            name={name}
            setName={setName}
            onNext={() => setStep(1)}
            onCancel={closeModal}
          />
        )}
        {step === 1 && (
          <CreateInterestModalS2
            interest={interest}
            setInterest={setInterest}
            onNext={() => setStep(2)}
            onCancel={closeModal}
          />
        )}
        {step === 2 && (
          <CreateInterestModalS3
            color={color}
            setColor={setColor}
            file={file}
            setFile={setFile}
            onNext={submit}
            onCancel={closeModal}
          />
        )}
      </Stack>
    </ModalView>
  )
}
