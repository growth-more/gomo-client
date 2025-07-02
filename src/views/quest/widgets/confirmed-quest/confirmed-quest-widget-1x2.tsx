import { useAssignQuest } from '@/api/hooks'
import { Widget } from '@/components/widget'
import { useToggleSignal } from '@/hooks/use-toggle-signal'
import { useModalStore } from '@/stores/use-modal-store'
import { QuestList } from '@/views/quest/components'
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
    const sorted = _([...daily.confirmed, ...weekly.confirmed, ...monthly.confirmed])
      .sortBy('displayOrder')
      .take(3)
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

  return (
    <Widget
      width={2}
      title="진행중인 퀘스트"
      subtitle={`${quests.left.length + quests.right.length}개 퀘스트 진행 중`}
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
