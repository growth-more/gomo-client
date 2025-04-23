import { useAssignQuest } from '@/api/hooks'
import { Widget } from '@/components/widget'
import { useModalStore } from '@/stores/use-modal-store'
import { QuestList } from '@/views/quest/components'
import { CREATE_QUEST_MODAL_ID, CreateQuestModal } from '@/views/quest/modals'
import { Box, Stack } from '@mui/material'
import _ from 'lodash'
import { useMemo } from 'react'

export function MonthlyQuestWidget1x2() {
  const { monthly, completeQuest } = useAssignQuest()
  const { addModal } = useModalStore()

  const quests = useMemo(() => {
    const sorted = _([...monthly.confirmed, ...monthly.completed])
      .sortBy('displayOrder')
      .sortBy((quest) => (quest.completed ? 1 : 0))
      .take(6)
      .value()

    return [_.filter(sorted, (_, i) => i % 2 === 0), _.filter(sorted, (_, i) => i % 2 === 1)]
  }, [monthly])

  const completeCount = useMemo(() => {
    return [monthly.completed.length, monthly.confirmed.length + monthly.completed.length]
  }, [monthly])

  const checkHandler = (id: string, checked: boolean) => {
    if (checked) {
      // TODO: proof 페이지 추가
      completeQuest(id, { proof: '' })
    }
  }

  const createQuestHandler = () => {
    addModal(CREATE_QUEST_MODAL_ID, <CreateQuestModal type="MONTHLY" />)
  }

  return (
    <Widget
      width={2}
      title="월간퀘스트"
      subtitle={`${completeCount[1]}개 중 ${completeCount[0]}개 완료`}
      onAdd={createQuestHandler}
    >
      <Stack
        direction="row"
        divider={<Box my={1} borderRight={1} borderColor={(theme) => theme.palette.border.main} />}
      >
        <QuestList quests={quests[0]} checkHandler={checkHandler} sx={{ width: '50%' }} />
        <QuestList quests={quests[1]} checkHandler={checkHandler} sx={{ width: '50%' }} />
      </Stack>
    </Widget>
  )
}
