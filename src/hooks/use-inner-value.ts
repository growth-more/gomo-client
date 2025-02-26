import { useEffect, useState } from 'react'

export function useInnerValue<T>(initialValue: T) {
  const [value, setValue] = useState<T>(initialValue)

  const reset = () => {
    setValue(initialValue)
  }

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return { value, setValue, reset }
}
