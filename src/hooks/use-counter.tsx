import { useEffect, useState } from 'react'

export function useCounter(initialCount: number) {
  const [count, setCount] = useState(initialCount)

  const add = (value: number) => {
    setCount((prev) => prev + value)
  }

  const sub = (value: number) => {
    setCount((prev) => prev - value)
  }

  const reset = () => {
    setCount(initialCount)
  }

  useEffect(() => {
    setCount(initialCount)
  }, [initialCount])

  return { count, add, sub, reset }
}
