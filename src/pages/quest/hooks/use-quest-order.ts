import { useEffect, useMemo, useState } from 'react'

interface IdProps {
  id: string
}

export function useQuestOrder<T extends IdProps>(quests: T[]) {
  const [value, setValue] = useState<T[]>([])
  const [prev, setPrev] = useState<T[]>([])

  const onDragStart = () => {
    setPrev([...value])
  }

  const onDragEnd = () => {
    if (!isChanged) {
      return
    }
    console.log('CHANGE')
  }

  const isChanged = useMemo(() => {
    if (prev.length !== value.length) {
      return true
    }
    const length = prev.length
    for (let i = 0; i < length; i++) {
      if (prev[i].id !== value[i].id) {
        return true
      }
    }
    return false
  }, [prev, value])

  useEffect(() => {
    setValue(quests)
  }, [quests])

  return { value, setValue, onDragStart, onDragEnd }
}
