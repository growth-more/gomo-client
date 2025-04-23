import { useState } from 'react'

export function useToggleSignal() {
  const [value, setValue] = useState(1)

  const toggle = () => {
    setValue((prev) => prev * -1)
  }

  return { value, toggle }
}
