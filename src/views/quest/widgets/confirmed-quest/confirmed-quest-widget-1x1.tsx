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
import { Box } from '@mui/material'
import _ from 'lodash'
import { useMemo } from 'react'

export function ConfirmedQuestWidget1x1() {
  const { daily, weekly, monthly } = useAssignQuest()
  const { addModal } = useModalStore()
  const initHash = useToggleSignal()

  const quests = useMemo(() => {
    return _([...daily.confirmed, ...weekly.confirmed, ...monthly.confirmed])
      .sortBy('displayOrder')
      .take(3)
      .value()
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
      width={1}
      title="진행중인 퀘스트"
      subtitle={`${quests.length}개 퀘스트 진행 중`}
      onTitle={openQuestHandler}
    >
      <Box p={1}>
        <QuestList quests={quests} checkHandler={checkHandler} initHash={initHash.value} />
      </Box>
    </Widget>
  )
}
