import { Checkbox } from '@/components/checkbox'
import { IconButtons } from '@/components/icon-button'
import { QuestType } from '@/entities'
import { QUEST_STATUS, QUEST_TYPE, QuestStatus } from '@/entities/quests'
import { Box, Stack, Typography } from '@mui/material'

interface QuestListEmptyProps {
  questStatus: QuestStatus
  questType: QuestType
}

export function QuestListEmpty({ questStatus, questType }: QuestListEmptyProps) {
  return (
    <Box
      p={1}
      borderRadius={1}
      sx={{
        '&:hover': { bgcolor: (theme) => theme.palette.background.main },
        opacity: 0.5,
        userSelect: 'none',
      }}
    >
      <Stack direction="row" justifyContent="space-between" sx={{ pointerEvents: 'none' }}>
        <Stack overflow="hidden">
          <Stack direction="row" alignItems="center" gap={1}>
            <Checkbox checked={false} />
            <Typography fontSize={15} fontWeight={500} noWrap>
              {QUEST_STATUS[questStatus].label}가 없어요
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap={1}>
            <Box width={30} />
            <Stack direction="row" alignItems="center">
              <Typography variant="caption">{QUEST_TYPE[questType].label}</Typography>
            </Stack>
          </Stack>
        </Stack>
        <IconButtons.Menu />
      </Stack>
    </Box>
  )
}
