import { useAssignQuest } from '@/api/hooks'
import { Widget } from '@/components/widget'
import { useModalStore } from '@/stores/use-modal-store'
import { QuestList } from '@/views/quest/components'
import { CREATE_QUEST_MODAL_ID, CreateQuestModal } from '@/views/quest/modals'
import { Box, Stack } from '@mui/material'
import _ from 'lodash'
import { useMemo } from 'react'

export function UnconfirmedQuestWidget1x2() {
  const { daily, weekly, monthly, confirmQuest } = useAssignQuest()
  const { addModal } = useModalStore()

  const quests = useMemo(() => {
    const sorted = _([...daily.unconfirmed, ...weekly.unconfirmed, ...monthly.unconfirmed])
      .sortBy('displayOrder')
      .take(6)
      .value()

    return [_.filter(sorted, (_, i) => i % 2 === 0), _.filter(sorted, (_, i) => i % 2 === 1)]
  }, [daily, weekly, monthly])

  const checkHandler = (id: string, checked: boolean) => {
    if (checked) {
      confirmQuest(id)
    }
  }

  const createQuestHandler = () => {
    addModal(CREATE_QUEST_MODAL_ID, <CreateQuestModal type="DAILY" />)
  }

  const unconfimedCount = quests[0].length + quests[1].length

  return (
    <Widget
      width={2}
      title="대기중인 퀘스트"
      subtitle={`${unconfimedCount}개 퀘스트 대기 중`}
      onAdd={createQuestHandler}
    >
      <Stack
        direction="row"
        divider={<Box my={1} borderRight={1} borderColor={(theme) => theme.palette.border.main} />}
      >
        <QuestList quests={quests[0]} checkHandler={checkHandler} sx={{ width: '50%' }} />
        <QuestList quests={quests[1]} checkHandler={checkHandler} sx={{ width: '50%' }} />
      </Stack>
    </Widget>
  )
}
