import { useDeleteInterest, useDeleteMajorInterest } from '@/api/hooks'
import { DANGER_DIALOG_ID } from '@/components/modal'
import { Interest } from '@/entities/interest'
import { IContextMenuItem } from '@/stores/use-context-menu-store'
import { useModalStore } from '@/stores/use-modal-store'
import { InterestDeleteDialog } from '@/views/interest/dialog/interest-delete-dialog'
import {
  UPDATE_INTEREST_CUSTOM_MODAL_ID,
  UPDATE_INTEREST_NAME_MODAL_ID,
  UPDATE_INTEREST_UPPER_MODAL_ID,
  UpdateInterestCustomModal,
  UpdateInterestNameModal,
  UpdateInterestUpperModal,
} from '@/views/interest/modals'
import { useCallback, useMemo } from 'react'

export function useMajorInterestItemContextMenu(
  interest: Interest | null,
  majorInterestId: string
) {
  const { addModal } = useModalStore()
  const { deleteInterest } = useDeleteInterest()
  const { deleteMajorInterest } = useDeleteMajorInterest()

  const onUpdateInterestName = useCallback(() => {
    if (!interest) {
      return
    }
    addModal(UPDATE_INTEREST_NAME_MODAL_ID, <UpdateInterestNameModal interest={interest} />)
  }, [addModal, interest])

  const onUpdateInterestUpper = useCallback(() => {
    if (!interest) {
      return
    }
    addModal(UPDATE_INTEREST_UPPER_MODAL_ID, <UpdateInterestUpperModal interest={interest} />)
  }, [addModal, interest])

  const onUpdateInterestCustom = useCallback(() => {
    if (!interest) {
      return
    }
    addModal(UPDATE_INTEREST_CUSTOM_MODAL_ID, <UpdateInterestCustomModal interest={interest} />)
  }, [addModal, interest])

  const onDeleteInterest = useCallback(() => {
    if (!interest) {
      return
    }
    addModal(
      DANGER_DIALOG_ID,
      <InterestDeleteDialog onSuccess={() => deleteInterest(interest.id)} />
    )
  }, [addModal, deleteInterest, interest])

  const contextMenu = useMemo<IContextMenuItem[][]>(
    () => [
      [
        {
          label: '주요 관심사 해제',
          onClick: () => deleteMajorInterest(majorInterestId),
        },
      ],
      [
        { label: '관심사 이름 변경', onClick: onUpdateInterestName },
        { label: '상위 관심사 변경', onClick: onUpdateInterestUpper },
        { label: '관심사 커스텀 변경', onClick: onUpdateInterestCustom },
      ],
      [{ label: '관심사 삭제', type: 'danger', onClick: onDeleteInterest }],
    ],
    [
      onDeleteInterest,
      onUpdateInterestCustom,
      onUpdateInterestName,
      onUpdateInterestUpper,
      deleteMajorInterest,
      majorInterestId,
    ]
  )

  if (!interest) {
    return { contextMenu: [] }
  }

  return { contextMenu }
}
