import { Widget } from '@/components/widget'
import { AssignQuest } from '@/entities/quest'
import { QuestList } from '@/views/quest/components'
import { Box, Stack } from '@mui/material'

const leftQuests: AssignQuest[] = [
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

const rightQuests: AssignQuest[] = [
  {
    id: '4',
    subjectId: '1',
    questType: 'WEEKLY',
    point: 10,
    score: 10,
    subjectName: 'Spring',
    content: '대용량 트래픽 처리 시스템 구현하기',
    proof: '1',
    startDateTime: new Date(),
    displayOrder: 1,
    completed: true,
    confirmed: true,
  },
  {
    id: '5',
    subjectId: '2',
    questType: 'MONTHLY',
    point: 20,
    score: 20,
    subjectName: 'React',
    content: '리액트 커스텀 훅 라이브러리 만들기',
    proof: '2',
    startDateTime: new Date(),
    displayOrder: 2,
    completed: false,
    confirmed: true,
  },
]

export function ConfirmedQuestWidget1x2Preview() {
  return (
    <Widget width={2} title="진행중인 퀘스트" subtitle={`5개 중 1개 완료`} sx={{ height: 1, p: 1 }}>
      <Stack
        spacing={0.5}
        direction="row"
        divider={<Box my={1} borderRight={1} borderColor={(theme) => theme.palette.border.main} />}
      >
        <QuestList quests={leftQuests} sx={{ width: '50%' }} />
        <QuestList quests={rightQuests} sx={{ width: '50%' }} />
      </Stack>
    </Widget>
  )
}
