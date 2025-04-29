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

export function DailyQuestWidget1x2() {
  const { daily } = useAssignQuest()
  const { addModal } = useModalStore()
  const initHash = useToggleSignal()

  const quests = useMemo(() => {
    const sorted = _([...daily.confirmed, ...daily.completed])
      .sortBy('displayOrder')
      .sortBy((quest) => (quest.completed ? 1 : 0))
      .take(6)
      .value()

    return {
      left: _.filter(sorted, (_, i) => i % 2 === 0),
      right: _.filter(sorted, (_, i) => i % 2 === 1),
    }
  }, [daily])

  const completeCount = useMemo(() => {
    return [daily.completed.length, daily.confirmed.length + daily.completed.length]
  }, [daily])

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
    addModal(CREATE_QUEST_MODAL_ID, <CreateQuestModal type="DAILY" />)
  }

  const openQuestHandler = () => {
    addModal(QUEST_MODAL_ID, <QuestModal initMenuId="DAILY_QUEST" />)
  }

  return (
    <Widget
      width={2}
      title="일일퀘스트"
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
          quests={quests.left}
          checkHandler={checkHandler}
          sx={{ width: '50%' }}
          initHash={initHash.value}
        />
        <QuestList
          quests={quests.right}
          checkHandler={checkHandler}
          sx={{ width: '50%' }}
          initHash={initHash.value}
        />
      </Stack>
    </Widget>
  )
}
