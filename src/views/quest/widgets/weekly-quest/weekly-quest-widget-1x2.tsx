import { useAssignQuest } from '@/api/hooks'
import { Widget } from '@/components/widget'
import { useToggleSignal } from '@/hooks/use-toggle-signal'
import { useModalStore } from '@/stores/use-modal-store'
import { QuestList } from '@/views/quest/components'
import { useCancelableCheck } from '@/views/quest/hooks/use-cancelable-check'
import { CREATE_QUEST_MODAL_ID, CreateQuestModal } from '@/views/quest/modals'
import { Box, Stack } from '@mui/material'
import _ from 'lodash'
import { useMemo } from 'react'

export function WeeklyQuestWidget1x2() {
  const { weekly, completeQuest } = useAssignQuest()
  const { addModal } = useModalStore()
  const initHash = useToggleSignal()

  const quests = useMemo(() => {
    const sorted = _([...weekly.confirmed, ...weekly.completed])
      .sortBy('displayOrder')
      .sortBy((quest) => (quest.completed ? 1 : 0))
      .take(6)
      .value()

    return [_.filter(sorted, (_, i) => i % 2 === 0), _.filter(sorted, (_, i) => i % 2 === 1)]
  }, [weekly])

  const completeCount = useMemo(() => {
    return [weekly.completed.length, weekly.confirmed.length + weekly.completed.length]
  }, [weekly])

  const checkHandler = useCancelableCheck((id) => {
    completeQuest(id, { proof: '' }, { onError: () => initHash.toggle() })
  })

  const createQuestHandler = () => {
    addModal(CREATE_QUEST_MODAL_ID, <CreateQuestModal type="WEEKLY" />)
  }

  return (
    <Widget
      width={2}
      title="주간퀘스트"
      subtitle={`${completeCount[1]}개 중 ${completeCount[0]}개 완료`}
      onAdd={createQuestHandler}
    >
      <Stack
        p={1}
        spacing={0.5}
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
