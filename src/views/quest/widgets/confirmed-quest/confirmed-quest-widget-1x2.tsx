import { useAssignQuest } from '@/api/hooks'
import { Widget } from '@/components/widget'
import { useToggleSignal } from '@/hooks/use-toggle-signal'
import { useModalStore } from '@/stores/use-modal-store'
import { QuestList, QuestWidgetEmpty } from '@/views/quest/components'
import {
  QUEST_MODAL_ID,
  QuestModal,
  QUEST_PROOF_MODAL_ID,
  QuestProofModal,
} from '@/views/quest/modals'
import { Box, Stack } from '@mui/material'
import _ from 'lodash'
import { useMemo } from 'react'

export function ConfirmedQuestWidget1x2() {
  const { daily, weekly, monthly } = useAssignQuest()
  const { addModal } = useModalStore()
  const initHash = useToggleSignal()

  const quests = useMemo(() => {
    const sorted = _([
      ...daily.confirmed,
      ...daily.completed,
      ...weekly.confirmed,
      ...weekly.completed,
      ...monthly.confirmed,
      ...monthly.completed,
    ])
      .sortBy('displayOrder')
      .sortBy((quest) => (quest.completed ? 1 : 0))
      .take(6)
      .value()

    return {
      left: _.filter(sorted, (_, i) => i % 2 === 0),
      right: _.filter(sorted, (_, i) => i % 2 === 1),
    }
  }, [daily, weekly, monthly])

  const checkHandler = (id: string, checked: boolean) => {
    if (!checked) {
      return
    }
    addModal(
      QUEST_PROOF_MODAL_ID,
      <QuestProofModal id={id} onError={initHash.toggle} onCancel={initHash.toggle} />
    )
  }

  const openQuestHandler = () => {
    addModal(QUEST_MODAL_ID, <QuestModal initMenuId="DAILY_QUEST" />)
  }

  const completeCount = useMemo(() => {
    return [
      daily.completed.length + weekly.completed.length + monthly.completed.length,
      daily.confirmed.length +
        weekly.confirmed.length +
        monthly.confirmed.length +
        daily.completed.length +
        weekly.completed.length +
        monthly.completed.length,
    ]
  }, [daily, weekly, monthly])

  return (
    <Widget
      width={2}
      title="진행중인 퀘스트"
      subtitle={`${completeCount[1]}개 중 ${completeCount[0]}개 완료`}
      onTitle={openQuestHandler}
      sx={{ height: 1, p: 1 }}
    >
      {quests.left.length > 0 || quests.right.length > 0 ? (
        <Stack
          spacing={0.5}
          direction="row"
          divider={
            <Box my={1} borderRight={1} borderColor={(theme) => theme.palette.border.main} />
          }
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
      ) : (
        <QuestWidgetEmpty type="CONFIRMED" />
      )}
    </Widget>
  )
}
