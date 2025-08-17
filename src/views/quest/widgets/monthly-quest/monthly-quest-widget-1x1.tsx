import { useAssignQuest } from '@/api/hooks'
import { Widget } from '@/components/widget'
import { useToggleSignal } from '@/hooks/use-toggle-signal'
import { useModalStore } from '@/stores/use-modal-store'
import { QuestList, QuestWidgetEmpty } from '@/views/quest/components'
import {
  CREATE_QUEST_MODAL_ID,
  CreateQuestModal,
  QUEST_MODAL_ID,
  QUEST_PROOF_MODAL_ID,
  QuestModal,
  QuestProofModal,
} from '@/views/quest/modals'
import _ from 'lodash'
import { useMemo } from 'react'

export function MonthlyQuestWidget1x1() {
  const { monthly } = useAssignQuest()
  const { addModal } = useModalStore()
  const initHash = useToggleSignal()

  const quests = useMemo(() => {
    return _([...monthly.confirmed, ...monthly.completed])
      .sortBy('displayOrder')
      .sortBy((quest) => (quest.completed ? 1 : 0))
      .take(3)
      .value()
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
      width={1}
      title="월간퀘스트"
      subtitle={`${completeCount[1]}개 중 ${completeCount[0]}개 완료`}
      onAdd={createQuestHandler}
      onTitle={openQuestHandler}
      sx={{ height: 1, p: 1 }}
    >
      {quests.length > 0 ? (
        <QuestList quests={quests} checkHandler={checkHandler} initHash={initHash.value} />
      ) : (
        <QuestWidgetEmpty type="MONTHLY" />
      )}
    </Widget>
  )
}
