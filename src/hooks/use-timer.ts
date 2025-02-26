import { useEffect, useState } from 'react'
import { useInterval } from './use-interval'
import { useBoolean } from './use-boolean'

export function useTimer(sec: number, onFinish?: () => void) {
  const [time, setTime] = useState(sec)
  const pause = useBoolean(true)

  useInterval(
    () => {
      setTime((prev) => {
        const next = prev - 1
        if (next === 0) {
          onFinish?.()
        }
        return next
      })
    },
    time > 0 && !pause.value ? 1000 : null
  )

  const start = () => {
    pause.onFalse()
  }

  const stop = () => {
    pause.onTrue()
  }

  const restart = () => {
    setTime(sec)
    pause.onFalse()
  }

  useEffect(() => {
    setTime(sec)
  }, [sec])

  return { time, start, stop, restart }
}
