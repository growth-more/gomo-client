import { useRef } from 'react'

export function useCancelableCheck(onComplete: (id: string) => void) {
  const cancelTimer = useRef<Map<string, NodeJS.Timeout>>(new Map())

  const completeQuest = (id: string) => {
    cancelTimer.current.delete(id)
    onComplete(id)
  }

  const checkHandler = (id: string, checked: boolean) => {
    // 퀘스트 완료
    if (checked) {
      const timer = setTimeout(() => completeQuest(id), 2000)
      cancelTimer.current.set(id, timer)
      return
    }
    // 퀘스트 완료 취소
    const timer = cancelTimer.current.get(id)
    if (timer) {
      clearTimeout(timer)
      cancelTimer.current.delete(id)
    }
  }

  return { checkHandler }
}
