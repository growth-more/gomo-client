import { AssignQuest } from '@/entities'
import { useEffect, useMemo, useState } from 'react'

export function useQuestOrder(quests: AssignQuest[]) {
  const [value, setValue] = useState<AssignQuest[]>([])
  const [prev, setPrev] = useState<AssignQuest[]>([])

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
