import { Interest } from '@/entities/interest'
import { IContextMenuItem } from '@/stores/use-context-menu-store'
import { useModalStore } from '@/stores/use-modal-store'
import {
  UPDATE_INTEREST_NAME_MODAL_ID,
  UPDATE_INTEREST_UPPER_MODAL_ID,
  UpdateInterestNameModal,
  UpdateInterestUpperModal,
} from '@/views/interest/modals'
import { useMemo } from 'react'

export function useInterestGraphIndicatorContextMenu(interest: Interest) {
  const { addModal } = useModalStore()

  const contextMenu = useMemo(() => {
    const context: IContextMenuItem[][] = [
      [
        {
          label: '주요 관심사로 지정',
        },
      ],
      [
        {
          label: '관심사 이름 변경',
          onClick: () =>
            addModal(
              UPDATE_INTEREST_NAME_MODAL_ID,
              <UpdateInterestNameModal interest={interest} />
            ),
        },
        {
          label: '상위 관심사 변경',
          onClick: () =>
            addModal(
              UPDATE_INTEREST_UPPER_MODAL_ID,
              <UpdateInterestUpperModal interest={interest} />
            ),
        },
        {
          label: '관심사 커스텀 변경',
        },
      ],
      [
        {
          label: '관심사 삭제',
          type: 'danger',
        },
      ],
    ]

    return context
  }, [addModal, interest])

  return { contextMenu }
}
