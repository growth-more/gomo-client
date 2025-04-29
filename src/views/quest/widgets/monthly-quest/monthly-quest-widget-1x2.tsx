import { useAssignQuest } from '@/api/hooks'
import { Widget } from '@/components/widget'
import { useToggleSignal } from '@/hooks/use-toggle-signal'
import { useModalStore } from '@/stores/use-modal-store'
import { QuestList } from '@/views/quest/components'
import {
  CREATE_QUEST_MODAL_ID,
  CreateQuestModal,
  QUEST_MODAL_ID,
  QUEST_PROOF_MODAL_ID,
  QuestModal,
  QuestProofModal,
} from '@/views/quest/modals'
import { Box, Stack } from '@mui/material'
import _ from 'lodash'
import { useMemo } from 'react'

export function MonthlyQuestWidget1x2() {
  const { monthly } = useAssignQuest()
  const { addModal } = useModalStore()
  const initHash = useToggleSignal()

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
    if (!checked) {
      return
    }
    addModal(
      QUEST_PROOF_MODAL_ID,
      <QuestProofModal id={id} onError={initHash.toggle} onCancel={initHash.toggle} />
    )
  }

  const createQuestHandler = () => {
    addModal(CREATE_QUEST_MODAL_ID, <CreateQuestModal type="MONTHLY" />)
  }

  const openQuestHandler = () => {
    addModal(QUEST_MODAL_ID, <QuestModal initMenuId="MONTHLY_QUEST" />)
  }

  return (
    <Widget
      width={2}
      title="월간퀘스트"
      subtitle={`${completeCount[1]}개 중 ${completeCount[0]}개 완료`}
      onAdd={createQuestHandler}
      onTitle={openQuestHandler}
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
