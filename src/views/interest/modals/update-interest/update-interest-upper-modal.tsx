import { useInterest } from '@/api/hooks'
import { Button } from '@/components/button'
import { ModalView } from '@/components/modal'
import { Interest } from '@/entities/interest'
import { useModalStore } from '@/stores/use-modal-store'
import { SelectInterest } from '@/views/interest/components'
import { Stack, Typography } from '@mui/material'
import { useMemo, useState } from 'react'

export const UPDATE_INTEREST_UPPER_MODAL_ID = 'UPDATE_INTEREST_UPPER_MODAL'

interface UpdateInterestUpperModalProps {
  interest: Interest
}

export function UpdateInterestUpperModal({ interest }: UpdateInterestUpperModalProps) {
  const { removeModal } = useModalStore()
  const { createEdge, deleteEdge, interestGraph } = useInterest()

  const prevUpperInterest = useMemo(() => {
    const edge = interestGraph.edge.find((edge) => edge.target === interest.id)
    return (
      interestGraph.vertex.find((vertex) => vertex.interest.id === edge?.source)?.interest ?? null
    )
  }, [interestGraph, interest])

  const [upperInterest, setUpperInterest] = useState<Interest | null>(prevUpperInterest)

  const closeModal = () => {
    removeModal(UPDATE_INTEREST_UPPER_MODAL_ID)
  }

  const submitHandler = () => {
    if (prevUpperInterest === null) {
      if (upperInterest !== null) {
        createEdge(
          { parentInterestId: upperInterest.id, childInterestId: interest.id },
          { onSuccess: closeModal }
        )
      }
      return
    }

    const prevEdgeId =
      interestGraph.edge.find(
        (edge) => edge.target === interest.id && edge.source === prevUpperInterest.id
      )?.id ?? null

    if (prevEdgeId === null) {
      return
    }
    if (upperInterest !== null) {
      deleteEdge(prevEdgeId)
      createEdge(
        { parentInterestId: upperInterest.id, childInterestId: interest.id },
        { onSuccess: closeModal }
      )
      return
    }
    deleteEdge(prevEdgeId, { onSuccess: closeModal })
  }

  return (
    <ModalView height={500}>
      <Stack p={2} height={1} justifyContent="space-between" spacing={2}>
        <Stack spacing={3} flex={1} overflow="hidden">
          <Typography fontSize={18} fontWeight={600} noWrap pt={1}>
            상위 관심사를 어떻게 변경할까요?
          </Typography>
          <SelectInterest
            selected={upperInterest}
            onChanged={setUpperInterest}
            sx={{ height: 1 }}
            enableNoneOption
            noneOptionLabel="상위 관심사 없음"
            onNoneOption={() => setUpperInterest(null)}
            disableInterestIds={[interest.id]}
          />
        </Stack>

        <Stack spacing={1}>
          <Button.Primary
            label="상위 관심사 변경하기"
            size="large"
            onClick={submitHandler}
            disabled={
              (prevUpperInterest === null && upperInterest === null) ||
              prevUpperInterest?.id === upperInterest?.id
            }
          />
          <Button.Plain label="취소" size="small" onClick={closeModal} />
        </Stack>
      </Stack>
    </ModalView>
  )
}
