import { useAssignQuest } from '@/api/hooks'
import { WidgetBasic } from '@/components/widget'
import { useToggleSignal } from '@/hooks/use-toggle-signal'
import { useModalStore } from '@/stores/use-modal-store'
import { QuestList, QuestWidgetEmpty } from '@/views/quest/components'
import {
  QUEST_MODAL_ID,
  QuestModal,
  QUEST_PROOF_MODAL_ID,
  QuestProofModal,
} from '@/views/quest/modals'
import _ from 'lodash'
import { useMemo } from 'react'

export function ConfirmedQuestWidget1x1() {
  const { daily, weekly, monthly } = useAssignQuest()
  const { addModal } = useModalStore()
  const initHash = useToggleSignal()

  const quests = useMemo(() => {
    return _([
      ...daily.confirmed,
      ...daily.completed,
      ...weekly.confirmed,
      ...weekly.completed,
      ...monthly.confirmed,
      ...monthly.completed,
    ])
      .sortBy('displayOrder')
      .sortBy((quest) => (quest.completed ? 1 : 0))
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
    <WidgetBasic
      width={1}
      title="진행중인 퀘스트"
      subtitle={`${completeCount[1]}개 중 ${completeCount[0]}개 완료`}
      onTitle={openQuestHandler}
      sx={{ height: 1, p: 1 }}
    >
      {quests.length > 0 ? (
        <QuestList quests={quests} checkHandler={checkHandler} initHash={initHash.value} />
      ) : (
        <QuestWidgetEmpty type="CONFIRMED" />
      )}
    </WidgetBasic>
  )
}
