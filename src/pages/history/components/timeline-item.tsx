import { QUEST_TYPE_LABEL } from '@/constants'
import { AssignQuestHistory } from '@/entities'
import { alpha, Box, Stack, Typography } from '@mui/material'

interface TimelineItemProps {
  data: AssignQuestHistory
}

export function TimelineItem({ data }: TimelineItemProps) {
  return (
    <Stack direction="row" spacing={1}>
      <Stack width={20} flexShrink={0} justifyContent="center" alignItems="center">
        <Box height={1} bgcolor="text.secondary" borderLeft={1.5} borderColor="divider" />
      </Stack>

      <Stack flex={1} py={0.5} height={100} overflow="hidden">
        <Stack
          height={100}
          direction="row"
          bgcolor={(theme) => alpha(theme.palette.background.paper, 0.4)}
          borderRadius={1}
          border={1}
          borderColor="divider"
          overflow="hidden"
          minWidth={0}
          sx={{ backdropFilter: 'blur(10px)' }}
        >
          <Box
            width="5px"
            height={1}
            flexShrink={0}
            bgcolor={(theme) => alpha(theme.palette.common.black, 0.5)}
          />
          <Stack width={1} p={1} justifyContent="space-between" overflow="hidden">
            <Stack direction="row" spacing={1} justifyContent="space-between">
              <Typography fontSize={14} color="text.secondary" noWrap>
                {data.content}
              </Typography>
              <Stack
                px={1}
                py={0.5}
                flexShrink={0}
                justifyContent="center"
                alignContent="center"
                bgcolor={(theme) => alpha(theme.palette.common.black, 0.3)}
                borderRadius={1}
              >
                <Typography fontSize={12} color="white">
                  {QUEST_TYPE_LABEL[data.questType]}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
