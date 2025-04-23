import { useAssignQuest } from '@/api/hooks'
import { Widget } from '@/components/widget'
import { useModalStore } from '@/stores/use-modal-store'
import { QuestList } from '@/views/quest/components'
import { CREATE_QUEST_MODAL_ID, CreateQuestModal } from '@/views/quest/modals'
import _ from 'lodash'
import { useMemo } from 'react'

export function MonthlyQuestWidget1x1() {
  const { monthly, completeQuest } = useAssignQuest()
  const { addModal } = useModalStore()

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
    if (checked) {
      // TODO: proof 페이지 추가
      completeQuest(id, { proof: '' })
    }
  }

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
      <QuestList quests={quests} checkHandler={checkHandler} />
    </Widget>
  )
}
