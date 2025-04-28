import { OrganizedAssignQuest } from '@/entities/quest'
import { Box, Collapse, Divider, IconButton, Stack, Typography } from '@mui/material'
import { QuestList } from './quest-list'
import { useBoolean } from '@/hooks'
import { Reorder } from 'motion/react'
import { useQuestOrder } from '@/pages/quest/hooks'
import { useRef } from 'react'

interface QuestSectionProps {
  quest: OrganizedAssignQuest
}

export function QuestSection({ quest }: QuestSectionProps) {
  const unconfirmedCollapse = useBoolean(true)
  const confirmedCollapse = useBoolean()
  const completedCollapse = useBoolean()

  const unconfirmedQuest = useQuestOrder(quest.unconfirmed)
  const confirmedQuest = useQuestOrder(quest.confirmed)
  const completedQuest = useQuestOrder(quest.completed)

  const unconfirmedRef = useRef<HTMLDivElement>(null)
  const confirmedRef = useRef<HTMLDivElement>(null)
  const completedRef = useRef<HTMLDivElement>(null)

  return (
    <Stack spacing={1}>
      <Box>
        <IconButton onClick={unconfirmedCollapse.toggle} sx={{ borderRadius: 1, p: 1 }}>
          <Typography variant="subtitle2">대기중인 퀘스트({quest.unconfirmed.length})</Typography>
        </IconButton>
        <Collapse in={unconfirmedCollapse.value}>
          <Box pt={1} />
          <Stack
            spacing={1}
            component={Reorder.Group}
            values={unconfirmedQuest.value}
            onReorder={unconfirmedQuest.setValue}
            sx={{ p: 0, m: 0 }}
            ref={unconfirmedRef}
          >
            {unconfirmedQuest.value.map((quest) => (
              <QuestList
                key={quest.id}
                quest={quest}
                onDragStart={unconfirmedQuest.onDragStart}
                onDragEnd={unconfirmedQuest.onDragEnd}
                constraints={unconfirmedRef}
              />
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
          <Stack
            spacing={1}
            component={Reorder.Group}
            values={confirmedQuest.value}
            onReorder={confirmedQuest.setValue}
            sx={{ p: 0, m: 0 }}
            ref={confirmedRef}
          >
            {confirmedQuest.value.map((quest) => (
              <QuestList
                key={quest.id}
                quest={quest}
                onDragStart={confirmedQuest.onDragStart}
                onDragEnd={confirmedQuest.onDragEnd}
                constraints={confirmedRef}
              />
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
          <Stack
            spacing={1}
            component={Reorder.Group}
            values={completedQuest.value}
            onReorder={completedQuest.setValue}
            sx={{ p: 0, m: 0 }}
            ref={completedRef}
          >
            {completedQuest.value.map((quest) => (
              <QuestList
                key={quest.id}
                quest={quest}
                onDragStart={completedQuest.onDragStart}
                onDragEnd={completedQuest.onDragEnd}
                constraints={completedRef}
              />
            ))}
          </Stack>
        </Collapse>
      </Box>
    </Stack>
  )
}
