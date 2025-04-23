import { useAssignQuest } from '@/api/hooks'
import { Widget } from '@/components/widget'
import { useModalStore } from '@/stores/use-modal-store'
import { QuestList } from '@/views/quest/components'
import { CREATE_QUEST_MODAL_ID, CreateQuestModal } from '@/views/quest/modals'
import _ from 'lodash'
import { useMemo } from 'react'

export function UnconfirmedQuestWidget1x1() {
  const { daily, weekly, monthly, confirmQuest } = useAssignQuest()
  const { addModal } = useModalStore()

  const quests = useMemo(() => {
    return _([...daily.unconfirmed, ...weekly.unconfirmed, ...monthly.unconfirmed])
      .sortBy('displayOrder')
      .take(3)
      .value()
  }, [daily, weekly, monthly])

  const checkHandler = (id: string, checked: boolean) => {
    if (checked) {
      confirmQuest(id)
    }
  }

  const createQuestHandler = () => {
    addModal(CREATE_QUEST_MODAL_ID, <CreateQuestModal type="DAILY" />)
  }

  const unconfimedCount = quests.length

  return (
    <Widget
      width={1}
      title="대기중인 퀘스트"
      subtitle={`${unconfimedCount}개 퀘스트 대기 중`}
      onAdd={createQuestHandler}
    >
      <QuestList quests={quests} checkHandler={checkHandler} />
    </Widget>
  )
}
