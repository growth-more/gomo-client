import { useAssignQuest } from '@/api/hooks'
import { QuestList } from '@/views/quest/components'
import { QuestModalTitle } from '@/views/quest/modals/main/quest-modal-title'
import { Box, Stack } from '@mui/material'

export function QuestModalDaily() {
  const { daily } = useAssignQuest()

  return (
    <Stack
      p={2}
      spacing={3}
      divider={<Box borderBottom={1} borderColor={(theme) => theme.palette.border.main} />}
    >
      <Stack spacing={2}>
        <QuestModalTitle questType="CONFIRMED" count={daily.confirmed.length} />
        <QuestList quests={daily.confirmed} checkHandler={() => {}} disableDivider enableMenu />
      </Stack>

      <Stack spacing={2}>
        <QuestModalTitle questType="UNCONFIRMED" count={daily.unconfirmed.length} />
        <QuestList quests={daily.unconfirmed} checkHandler={() => {}} disableDivider enableMenu />
      </Stack>

      <Stack spacing={2}>
        <QuestModalTitle questType="COMPLETED" count={daily.completed.length} />
        <QuestList quests={daily.completed} checkHandler={() => {}} disableDivider enableMenu />
      </Stack>
    </Stack>
  )
}
