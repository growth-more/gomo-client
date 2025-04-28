import { useAssignQuest } from '@/api/hooks'
import { OrganizedAssignQuest, QuestType } from '@/entities'
import { QuestModalQuestList } from '@/views/quest/modals/main/quest-modal-quest-list'
import { Box, Stack } from '@mui/material'

interface QuestModalQuestSectionProps {
  quests: OrganizedAssignQuest
  questType: QuestType
}

export function QuestModalQuestSection({ quests, questType }: QuestModalQuestSectionProps) {
  const { completeQuest, confirmQuest } = useAssignQuest()

  const completeHandler = (id: string, checked: boolean) => {
    if (!checked) {
      return
    }
    completeQuest(id, { proof: '테스트' })
  }

  const confirmHandler = (id: string, checked: boolean) => {
    if (!checked) {
      return
    }
    confirmQuest(id)
  }

  return (
    <Stack
      p={2}
      spacing={3}
      divider={<Box borderBottom={1} borderColor={(theme) => theme.palette.border.main} />}
    >
      <QuestModalQuestList
        questType={questType}
        questStatus="CONFIRMED"
        quests={quests.confirmed}
        checkHandler={completeHandler}
      />
      <QuestModalQuestList
        questType={questType}
        questStatus="UNCONFIRMED"
        quests={quests.unconfirmed}
        checkHandler={confirmHandler}
      />
      <QuestModalQuestList
        questType={questType}
        questStatus="COMPLETED"
        quests={quests.completed}
        checkHandler={completeHandler}
      />
    </Stack>
  )
}
