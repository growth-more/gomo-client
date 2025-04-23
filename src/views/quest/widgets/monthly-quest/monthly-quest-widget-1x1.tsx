import { useAssignQuest } from '@/api/hooks'
import { Widget } from '@/components/widget'
import { useToggleSignal } from '@/hooks/use-toggle-signal'
import { useModalStore } from '@/stores/use-modal-store'
import { QuestList } from '@/views/quest/components'
import { useCancelableCheck } from '@/views/quest/hooks/use-cancelable-check'
import { CREATE_QUEST_MODAL_ID, CreateQuestModal } from '@/views/quest/modals'
import _ from 'lodash'
import { useMemo } from 'react'

export function MonthlyQuestWidget1x1() {
  const { monthly, completeQuest } = useAssignQuest()
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

  const checkHandler = useCancelableCheck((id) => {
    completeQuest(id, { proof: '' }, { onError: () => initHash.toggle() })
  })

  const createQuestHandler = () => {
    addModal(CREATE_QUEST_MODAL_ID, <CreateQuestModal type="MONTHLY" />)
  }

  return (
    <Widget
      width={1}
      title="월간퀘스트"
      subtitle={`${completeCount[1]}개 중 ${completeCount[0]}개 완료`}
      onAdd={createQuestHandler}
    >
      <QuestList quests={quests} checkHandler={checkHandler} initHash={initHash.value} />
    </Widget>
  )
}
