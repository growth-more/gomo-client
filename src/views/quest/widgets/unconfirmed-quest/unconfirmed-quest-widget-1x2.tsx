import { useAssignQuest } from '@/api/hooks'
import { Widget } from '@/components/widget'
import { useToggleSignal } from '@/hooks/use-toggle-signal'
import { QuestList } from '@/views/quest/components'
import { useCancelableCheck } from '@/views/quest/hooks/use-cancelable-check'
import { Box, Stack } from '@mui/material'
import _ from 'lodash'
import { useMemo } from 'react'

export function UnconfirmedQuestWidget1x2() {
  const { daily, weekly, monthly, confirmQuest } = useAssignQuest()
  const initHash = useToggleSignal()

  const quests = useMemo(() => {
    const sorted = _([...daily.unconfirmed, ...weekly.unconfirmed, ...monthly.unconfirmed])
      .sortBy('displayOrder')
      .take(6)
      .value()

    return [_.filter(sorted, (_, i) => i % 2 === 0), _.filter(sorted, (_, i) => i % 2 === 1)]
  }, [daily, weekly, monthly])

  const checkHandler = useCancelableCheck((id) => {
    confirmQuest(id, { onError: () => initHash.toggle() })
  })

  const unconfimedCount = quests[0].length + quests[1].length

  return (
    <Widget width={2} title="대기중인 퀘스트" subtitle={`${unconfimedCount}개 퀘스트 대기 중`}>
      <Stack
        direction="row"
        divider={<Box my={1} borderRight={1} borderColor={(theme) => theme.palette.border.main} />}
      >
        <QuestList
          quests={quests[0]}
          checkHandler={checkHandler}
          sx={{ width: '50%' }}
          initHash={initHash.value}
        />
        <QuestList
          quests={quests[1]}
          checkHandler={checkHandler}
          sx={{ width: '50%' }}
          initHash={initHash.value}
        />
      </Stack>
    </Widget>
  )
}
