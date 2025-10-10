import { WidgetBasic } from '@/components/widget'
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

const rightQuests: AssignQuest[] = [
  {
    id: '4',
    subjectId: '4',
    questType: 'DAILY',
    point: 40,
    score: 40,
    subjectName: 'JavaScript',
    content: '토이 프로젝트 코드 리뷰하기',
    proof: '4',
    startDateTime: new Date(),
    displayOrder: 4,
    completed: false,
    confirmed: false,
  },
  {
    id: '5',
    subjectId: '5',
    questType: 'DAILY',
    point: 50,
    score: 50,
    subjectName: 'Spring',
    content: 'MSA 기반 커머스 플랫폼 구축하기',
    proof: '5',
    startDateTime: new Date(),
    displayOrder: 5,
    completed: false,
    confirmed: false,
  },
]

export function UnconfirmedQuestWidget1x2Preview() {
  return (
    <WidgetBasic
      width={2}
      title="대기중인 퀘스트"
      subtitle={`5개 퀘스트 대기 중`}
      sx={{ height: 1, p: 1 }}
    >
      <Stack
        spacing={0.5}
        direction="row"
        divider={<Box my={1} borderRight={1} borderColor={(theme) => theme.palette.border.main} />}
      >
        <QuestList quests={leftQuests} sx={{ width: '50%' }} />
        <QuestList quests={rightQuests} sx={{ width: '50%' }} />
      </Stack>
    </WidgetBasic>
  )
}
