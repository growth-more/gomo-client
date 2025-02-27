import { QuestItem } from '@/components/quest'
import { AssignQuestHistory } from '@/entities'
import { alpha, Box, Stack } from '@mui/material'

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
        <QuestItem
          content={data.content}
          questType={data.questType}
          labelColor={(theme) => alpha(theme.palette.common.black, 0.5)}
        />
      </Stack>
    </Stack>
  )
}
