import { useAssignQuest } from '@/api/hooks'
import { WidgetBasic } from '@/components/widget'
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

export function WeeklyQuestWidget1x1() {
  const { weekly } = useAssignQuest()
  const { addModal } = useModalStore()
  const initHash = useToggleSignal()

  const quests = useMemo(() => {
    return _([...weekly.confirmed, ...weekly.completed])
      .sortBy('displayOrder')
      .sortBy((quest) => (quest.completed ? 1 : 0))
      .take(3)
      .value()
  }, [weekly])

  const completeCount = useMemo(() => {
    return [weekly.completed.length, weekly.confirmed.length + weekly.completed.length]
  }, [weekly])

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
    addModal(CREATE_QUEST_MODAL_ID, <CreateQuestModal type="WEEKLY" />)
  }

  const openQuestHandler = () => {
    addModal(QUEST_MODAL_ID, <QuestModal initMenuId="WEEKLY_QUEST" />)
  }

  return (
    <WidgetBasic
      width={1}
      title="주간퀘스트"
      subtitle={`${completeCount[1]}개 중 ${completeCount[0]}개 완료`}
      onAdd={createQuestHandler}
      onTitle={openQuestHandler}
      sx={{ height: 1, p: 1 }}
    >
      {quests.length > 0 ? (
        <QuestList quests={quests} checkHandler={checkHandler} initHash={initHash.value} />
      ) : (
        <QuestWidgetEmpty type="WEEKLY" />
      )}
    </WidgetBasic>
  )
}
