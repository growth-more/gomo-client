import { OrganizedRepeatQuest } from '@/entities'
import { Box, Collapse, Divider, IconButton, Stack, Typography } from '@mui/material'
import { useBoolean } from '@/hooks'
import { Reorder } from 'motion/react'
import { useQuestOrder } from '@/pages/quest/hooks'
import { useRef } from 'react'
import { RepeatQuestList } from '@/pages/quest/components'

interface RepeatQuestSectionProps {
  quest: OrganizedRepeatQuest
}

export function RepeatQuestSection({ quest }: RepeatQuestSectionProps) {
  const dailyCollapse = useBoolean(true)
  const weeklyCollapse = useBoolean()
  const monthlyCollapse = useBoolean()

  const dailyRepeatQuest = useQuestOrder(quest.daily)
  const weeklyRepeatQuest = useQuestOrder(quest.weekly)
  const monthlyRepeatQuest = useQuestOrder(quest.monthly)

  const dailyContstraintsRef = useRef<HTMLDivElement>(null)
  const weeklyConstraintsRef = useRef<HTMLDivElement>(null)
  const monthlyConstraintsRef = useRef<HTMLDivElement>(null)

  return (
    <Stack spacing={1}>
      <Box>
        <IconButton onClick={dailyCollapse.toggle} sx={{ borderRadius: 1, p: 1 }}>
          <Typography variant="subtitle2">일일 반복 퀘스트({quest.daily.length})</Typography>
        </IconButton>
        <Collapse in={dailyCollapse.value}>
          <Box pt={1} />
          <Stack
            spacing={1}
            component={Reorder.Group}
            values={dailyRepeatQuest.value}
            onReorder={dailyRepeatQuest.setValue}
            sx={{ p: 0, m: 0 }}
            ref={dailyContstraintsRef}
          >
            {dailyRepeatQuest.value.map((quest) => (
              <RepeatQuestList
                key={quest.id}
                quest={quest}
                onDragStart={dailyRepeatQuest.onDragStart}
                onDragEnd={dailyRepeatQuest.onDragEnd}
                constraints={dailyContstraintsRef}
              />
            ))}
          </Stack>
        </Collapse>
      </Box>

      <Divider />

      <Box>
        <IconButton onClick={weeklyCollapse.toggle} sx={{ borderRadius: 1, p: 1 }}>
          <Typography variant="subtitle2">주간 반복 퀘스트({quest.weekly.length})</Typography>
        </IconButton>
        <Collapse in={weeklyCollapse.value}>
          <Box pt={1} />
          <Stack
            spacing={1}
            component={Reorder.Group}
            values={weeklyRepeatQuest.value}
            onReorder={weeklyRepeatQuest.setValue}
            sx={{ p: 0, m: 0 }}
            ref={weeklyConstraintsRef}
          >
            {weeklyRepeatQuest.value.map((quest) => (
              <RepeatQuestList
                key={quest.id}
                quest={quest}
                onDragStart={weeklyRepeatQuest.onDragStart}
                onDragEnd={weeklyRepeatQuest.onDragEnd}
                constraints={weeklyConstraintsRef}
              />
            ))}
          </Stack>
        </Collapse>
      </Box>

      <Divider />

      <Box>
        <IconButton onClick={monthlyCollapse.toggle} sx={{ borderRadius: 1, p: 1 }}>
          <Typography variant="subtitle2">월간 반복 퀘스트({quest.monthly.length})</Typography>
        </IconButton>
        <Collapse in={monthlyCollapse.value}>
          <Box pt={1} />
          <Stack
            spacing={1}
            component={Reorder.Group}
            values={monthlyRepeatQuest.value}
            onReorder={monthlyRepeatQuest.setValue}
            sx={{ p: 0, m: 0 }}
            ref={monthlyConstraintsRef}
          >
            {monthlyRepeatQuest.value.map((quest) => (
              <RepeatQuestList
                key={quest.id}
                quest={quest}
                onDragStart={monthlyRepeatQuest.onDragStart}
                onDragEnd={monthlyRepeatQuest.onDragEnd}
                constraints={monthlyConstraintsRef}
              />
            ))}
          </Stack>
        </Collapse>
      </Box>
    </Stack>
  )
}
