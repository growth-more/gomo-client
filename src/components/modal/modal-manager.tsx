import { useModalStore } from '@/stores/use-modal-store'
import { Fragment } from 'react'

export function ModalManager() {
  const { modals } = useModalStore()

  return (
    <>
      {modals.map((modal) => (
        <Fragment key={modal.id}>{modal.component}</Fragment>
      ))}
    </>
  )
}
