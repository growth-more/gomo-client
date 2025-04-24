import { useAssignQuest } from '@/api/hooks'
import { Widget } from '@/components/widget'
import { useToggleSignal } from '@/hooks/use-toggle-signal'
import { useModalStore } from '@/stores/use-modal-store'
import { QuestList } from '@/views/quest/components'
import { useCancelableCheck } from '@/views/quest/hooks/use-cancelable-check'
import { CREATE_QUEST_MODAL_ID, CreateQuestModal } from '@/views/quest/modals'
import { QUEST_MODAL_ID, QuestModal } from '@/views/quest/modals/main/quest-modal'
import _ from 'lodash'
import { useMemo } from 'react'

export function DailyQuestWidget1x1() {
  const { daily, completeQuest } = useAssignQuest()
  const { addModal } = useModalStore()
  const initHash = useToggleSignal()

  const quests = useMemo(() => {
    return _([...daily.confirmed, ...daily.completed])
      .sortBy('displayOrder')
      .sortBy((quest) => (quest.completed ? 1 : 0))
      .take(3)
      .value()
  }, [daily])

  const completeCount = useMemo(() => {
    return [daily.completed.length, daily.confirmed.length + daily.completed.length]
  }, [daily])

  const checkHandler = useCancelableCheck((id) => {
    completeQuest(id, { proof: '' }, { onError: () => initHash.toggle() })
  })

  const createQuestHandler = () => {
    addModal(CREATE_QUEST_MODAL_ID, <CreateQuestModal type="DAILY" />)
  }

  const openQuestHandler = () => {
    addModal(QUEST_MODAL_ID, <QuestModal />)
  }

  return (
    <Widget
      width={1}
      title="일일퀘스트"
      subtitle={`${completeCount[1]}개 중 ${completeCount[0]}개 완료`}
      onAdd={createQuestHandler}
      onTitle={openQuestHandler}
    >
      <QuestList quests={quests} checkHandler={checkHandler} initHash={initHash.value} />
    </Widget>
  )
}
