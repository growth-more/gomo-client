import { OrganizedAssignQuest } from '@/entities'
import { Box, Collapse, Divider, IconButton, Stack, Typography } from '@mui/material'
import { QuestList } from './quest-list'
import { useBoolean } from '@/hooks'

interface QuestSectionProps {
  quest: OrganizedAssignQuest
  questType: string
}

export function QuestSection({ quest, questType }: QuestSectionProps) {
  const unconfirmedCollapse = useBoolean(true)
  const confirmedCollapse = useBoolean()
  const completedCollapse = useBoolean()

  return (
    <Stack spacing={1}>
      <Box>
        <IconButton onClick={unconfirmedCollapse.toggle} sx={{ borderRadius: 1, p: 1 }}>
          <Typography variant="subtitle2">대기중인 퀘스트({quest.unconfirmed.length})</Typography>
        </IconButton>
        <Collapse in={unconfirmedCollapse.value}>
          <Box pt={1} />
          <Stack spacing={1}>
            {quest.unconfirmed.map((quest) => (
              <QuestList key={quest.id} quest={quest} questType={questType} />
            ))}
          </Stack>
        </Collapse>
      </Box>

      <Divider />

      <Box>
        <IconButton onClick={confirmedCollapse.toggle} sx={{ borderRadius: 1, p: 1 }}>
          <Typography variant="subtitle2">진행중인 퀘스트({quest.confirmed.length})</Typography>
        </IconButton>
        <Collapse in={confirmedCollapse.value}>
          <Box pt={1} />
          <Stack spacing={1}>
            {quest.confirmed.map((quest) => (
              <QuestList key={quest.id} quest={quest} questType={questType} />
            ))}
          </Stack>
        </Collapse>
      </Box>

      <Divider />

      <Box>
        <IconButton onClick={completedCollapse.toggle} sx={{ borderRadius: 1, p: 1 }}>
          <Typography variant="subtitle2">완료한 퀘스트({quest.completed.length})</Typography>
        </IconButton>
        <Collapse in={completedCollapse.value}>
          <Box pt={1} />
          <Stack spacing={1}>
            {quest.completed.map((quest) => (
              <QuestList key={quest.id} quest={quest} questType={questType} />
            ))}
          </Stack>
        </Collapse>
      </Box>
    </Stack>
  )
}
