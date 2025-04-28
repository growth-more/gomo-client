import { useAssignQuest } from '@/api/hooks'
import { Widget } from '@/components/widget'
import { useToggleSignal } from '@/hooks/use-toggle-signal'
import { QuestList } from '@/views/quest/components'
import { useCancelableCheck } from '@/views/quest/hooks/use-cancelable-check'
import { Box } from '@mui/material'
import _ from 'lodash'
import { useMemo } from 'react'

export function UnconfirmedQuestWidget1x1() {
  const { daily, weekly, monthly, confirmQuest } = useAssignQuest()
  const initHash = useToggleSignal()

  const quests = useMemo(() => {
    return _([...daily.unconfirmed, ...weekly.unconfirmed, ...monthly.unconfirmed])
      .sortBy('displayOrder')
      .take(3)
      .value()
  }, [daily, weekly, monthly])

  const checkHandler = useCancelableCheck((id) => {
    confirmQuest(id, { onError: () => initHash.toggle() })
  })

  const unconfimedCount = quests.length

  return (
    <Widget width={1} title="대기중인 퀘스트" subtitle={`${unconfimedCount}개 퀘스트 대기 중`}>
      <Box p={1}>
        <QuestList quests={quests} checkHandler={checkHandler} initHash={initHash.value} />
      </Box>
    </Widget>
  )
}
