import { useMemo, useState, useCallback } from 'react'

export interface UseBooleanReturn {
  value: boolean
  onTrue: () => void
  onFalse: () => void
  toggle: () => void
  setValue: (value: boolean) => void
}

export function useBoolean(defaultValue: boolean = false): UseBooleanReturn {
  const [value, setValue] = useState(defaultValue)

  const onTrue = useCallback(() => {
    setValue(true)
  }, [])

  const onFalse = useCallback(() => {
    setValue(false)
  }, [])

  const toggle = useCallback(() => {
    setValue((prev) => !prev)
  }, [])

  const memoizedValue = useMemo(
    () => ({
      value,
      onTrue,
      onFalse,
      setValue,
      toggle,
    }),
    [value, onTrue, onFalse, setValue, toggle]
  )

  return memoizedValue
}
