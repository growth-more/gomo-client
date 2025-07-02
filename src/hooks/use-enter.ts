import { useEffect } from 'react'

export function useEnter(onEnter: () => void) {
  useEffect(() => {
    const keyboardHandler = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        onEnter?.()
        event.stopPropagation()
      }
    }
    window.addEventListener('keyup', keyboardHandler)
    return () => {
      window.removeEventListener('keyup', keyboardHandler)
    }
  }, [onEnter])
}
