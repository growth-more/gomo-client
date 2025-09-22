import { Widget } from '@/components/widget'
import { AssignQuest } from '@/entities/quest'
import { QuestList } from '@/views/quest/components'

const quests: AssignQuest[] = [
  {
    id: '1',
    subjectId: '1',
    questType: 'DAILY',
    point: 10,
    score: 10,
    subjectName: 'Java',
    content: '자바 기초 문법 학습하기',
    proof: '1',
    startDateTime: new Date(),
    displayOrder: 1,
    completed: false,
    confirmed: false,
  },
  {
    id: '2',
    subjectId: '2',
    questType: 'DAILY',
    point: 20,
    score: 20,
    subjectName: 'Python',
    content: '파이썬 기초 문법 학습하기',
    proof: '2',
    startDateTime: new Date(),
    displayOrder: 2,
    completed: false,
    confirmed: false,
  },
  {
    id: '3',
    subjectId: '3',
    questType: 'DAILY',
    point: 30,
    score: 30,
    subjectName: '운동',
    content: '유산소 운동 30분 하기',
    proof: '3',
    startDateTime: new Date(),
    displayOrder: 3,
    completed: false,
    confirmed: false,
  },
]

export function UnconfirmedQuestWidget1x1Preview() {
  return (
    <Widget
      width={1}
      title="대기중인 퀘스트"
      subtitle={`5개 퀘스트 대기 중`}
      sx={{ height: 1, p: 1 }}
    >
      <QuestList quests={quests} />
    </Widget>
  )
}
