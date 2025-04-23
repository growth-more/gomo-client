import { useAssignQuest } from '@/api/hooks'
import { Widget } from '@/components/widget'
import { useToggleSignal } from '@/hooks/use-toggle-signal'
import { useModalStore } from '@/stores/use-modal-store'
import { QuestList } from '@/views/quest/components'
import { useCancelableCheck } from '@/views/quest/hooks/use-cancelable-check'
import { CREATE_QUEST_MODAL_ID, CreateQuestModal } from '@/views/quest/modals'
import _ from 'lodash'
import { useMemo } from 'react'

export function WeeklyQuestWidget1x1() {
  const { weekly, completeQuest } = useAssignQuest()
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

  const checkHandler = useCancelableCheck((id) => {
    completeQuest(id, { proof: '' }, { onError: () => initHash.toggle() })
  })

  const createQuestHandler = () => {
    addModal(CREATE_QUEST_MODAL_ID, <CreateQuestModal type="WEEKLY" />)
  }

  return (
    <Widget
      width={1}
      title="주간퀘스트"
      subtitle={`${completeCount[1]}개 중 ${completeCount[0]}개 완료`}
      onAdd={createQuestHandler}
    >
      <QuestList quests={quests} checkHandler={checkHandler} initHash={initHash.value} />
    </Widget>
  )
}
