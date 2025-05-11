import { QUEST_TYPE, RepeatQuest } from '@/entities/quest'
import { QuestType } from '@/entities/quest'
import { RepeatQuestListItem } from '@/views/quest/components/repeat-quest-list-item'
import { Stack, Typography } from '@mui/material'

interface QuestModalRepeatQuestSectionProps {
  quests: RepeatQuest[]
  questType: QuestType
}

export function QuestModalRepeatQuestSection({
  quests,
  questType,
}: QuestModalRepeatQuestSectionProps) {
  return (
    <Stack spacing={2} p={2}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography fontSize={15} fontWeight={600}>
          {QUEST_TYPE[questType].label}
        </Typography>
        <Typography
          fontSize={18}
          fontWeight={600}
          sx={{ color: (theme) => theme.palette.primary.main }}
        >
          {quests.length}개
        </Typography>
      </Stack>

      <Stack spacing={0.5}>
        {quests.length > 0
          ? quests.map((quest) => <RepeatQuestListItem key={quest.id} quest={quest} enableMenu />)
          : undefined}
      </Stack>
    </Stack>
  )
}
