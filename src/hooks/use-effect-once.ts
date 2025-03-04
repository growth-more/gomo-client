import { DependencyList, useEffect, useRef } from 'react'

export function useEffectOnce(callback: () => void, deps: DependencyList) {
  const isOnce = useRef(false)

  useEffect(() => {
    if (isOnce.current) {
      return
    }
    isOnce.current = true
    callback()
  }, [callback, deps])
}
