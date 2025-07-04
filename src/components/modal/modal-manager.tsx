import { useModalStore } from '@/stores/use-modal-store'
import { Fragment, useEffect } from 'react'

export function ModalManager() {
  const { modals, popModal } = useModalStore()

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        popModal()
      }
    }
    document.addEventListener('keydown', keyDownHandler)
    return () => {
      document.removeEventListener('keydown', keyDownHandler)
    }
  }, [popModal])

  return (
    <>
      {modals.map((modal) => (
        <Fragment key={modal.id}>{modal.component}</Fragment>
      ))}
    </>
  )
}
