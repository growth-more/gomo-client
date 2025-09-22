import { Widget } from '@/components/widget'
import { AssignQuest } from '@/entities/quest'
import { QuestList } from '@/views/quest/components'

const questsData: AssignQuest[] = [
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
    confirmed: true,
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
    confirmed: true,
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
    confirmed: true,
  },
]

export function ConfirmedQuestWidget1x1Preview() {
  return (
    <Widget width={1} title="진행중인 퀘스트" subtitle={`4개 중 1개 완료`} sx={{ height: 1, p: 1 }}>
      <QuestList quests={questsData} />
    </Widget>
  )
}
