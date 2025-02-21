import { Iconify } from '@/components/iconify'
import { AssignQuest } from '@/entities'
import { alpha, Box, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { QuestScore } from './quest-score'
import { useMemo } from 'react'

interface QuestListProps {
  quest: AssignQuest
  questType: string
}

export function QuestList({ quest, questType }: QuestListProps) {
  const acceptTooltip = useMemo(() => {
    if (quest.confirmed) {
      return '퀘스트 완료'
    }
    return '퀘스트 수락'
  }, [quest])

  return (
    <Stack
      height={100}
      direction="row"
      bgcolor={(theme) => alpha(theme.palette.background.paper, 0.4)}
      borderRadius={1}
      border={1}
      borderColor="divider"
      overflow="hidden"
    >
      <Box width="5px" height={1} bgcolor={(theme) => alpha(theme.palette.primary.main, 1)} />

      <Stack width={1} p={1} justifyContent="space-between">
        <Stack direction="row" spacing={1} justifyContent="space-between">
          <Typography fontSize={14}>{quest.content}</Typography>
          <Typography
            fontSize={12}
            color="white"
            px={1}
            py={0.5}
            bgcolor={(theme) => alpha(theme.palette.common.black, 0.3)}
            borderRadius={1}
          >
            {questType}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} justifyContent="space-between" height={30}>
          <Stack direction="row" spacing={0.5}>
            <QuestScore score={quest.score} icon="solar:star-bold" />
            <QuestScore score={quest.score} icon="mingcute:coin-3-fill" />
          </Stack>

          {!quest.completed && (
            <Tooltip title={acceptTooltip}>
              <IconButton size="small">
                <Iconify icon="mdi:check" />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}
