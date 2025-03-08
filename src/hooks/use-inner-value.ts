import { useEffect, useMemo, useState } from 'react'

export function useInnerValue<T>(initialValue: T) {
  const [value, setValue] = useState<T>(initialValue)

  const isChanged = useMemo(() => {
    return value !== initialValue
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const reset = () => {
    setValue(initialValue)
  }

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return { value, isChanged, setValue, reset }
}
