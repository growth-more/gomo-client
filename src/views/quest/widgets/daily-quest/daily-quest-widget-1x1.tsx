import { useAssignQuest } from '@/api/hooks'
import { Widget } from '@/components/widget'
import { QuestList } from '@/views/quest/components'
import _ from 'lodash'
import { useMemo } from 'react'

export function DailyQuestWidget1x1() {
  const { daily, completeQuest } = useAssignQuest()

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

  const checkHandler = (id: string, checked: boolean) => {
    if (checked) {
      // TODO: proof 페이지 추가
      completeQuest(id, { proof: '' })
    }
  }

  return (
    <Widget
      width={1}
      title="일일퀘스트"
      subtitle={`${completeCount[1]}개 중 ${completeCount[0]}개 완료`}
      onAdd={() => {}}
    >
      <QuestList quests={quests} checkHandler={checkHandler} />
    </Widget>
  )
}
