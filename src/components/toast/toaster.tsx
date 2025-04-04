import { Toaster as SonnerToaster } from 'sonner'

const TOAST_DURATION = 1500
const TOAST_LIMIT = 3

export function Toaster() {
  return (
    <SonnerToaster position="top-right" duration={TOAST_DURATION} visibleToasts={TOAST_LIMIT} />
  )
}
