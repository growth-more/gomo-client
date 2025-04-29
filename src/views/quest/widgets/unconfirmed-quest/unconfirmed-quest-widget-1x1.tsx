import { useAssignQuest } from '@/api/hooks'
import { Widget } from '@/components/widget'
import { useToggleSignal } from '@/hooks/use-toggle-signal'
import { useModalStore } from '@/stores/use-modal-store'
import { QuestList } from '@/views/quest/components'
import { QUEST_MODAL_ID, QuestModal } from '@/views/quest/modals'
import { Box } from '@mui/material'
import _ from 'lodash'
import { useMemo } from 'react'

export function UnconfirmedQuestWidget1x1() {
  const { daily, weekly, monthly, confirmQuest } = useAssignQuest()
  const { addModal } = useModalStore()
  const initHash = useToggleSignal()

  const quests = useMemo(() => {
    return _([...daily.unconfirmed, ...weekly.unconfirmed, ...monthly.unconfirmed])
      .sortBy('displayOrder')
      .take(3)
      .value()
  }, [daily, weekly, monthly])

  const checkHandler = (id: string, checked: boolean) => {
    if (!checked) {
      return
    }
    confirmQuest(id, { onError: () => initHash.toggle() })
  }

  const openQuestHandler = () => {
    addModal(QUEST_MODAL_ID, <QuestModal initMenuId="DAILY_QUEST" />)
  }

  return (
    <Widget
      width={1}
      title="대기중인 퀘스트"
      subtitle={`${quests.length}개 퀘스트 대기 중`}
      onTitle={openQuestHandler}
    >
      <Box p={1}>
        <QuestList quests={quests} checkHandler={checkHandler} initHash={initHash.value} />
      </Box>
    </Widget>
  )
}
