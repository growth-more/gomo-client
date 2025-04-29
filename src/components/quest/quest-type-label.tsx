import { QUEST_TYPE, QuestType } from '@/entities/quest'
import { alpha, Box, Typography } from '@mui/material'

interface QuestTypeLabelProps {
  questType: QuestType
}

export function QuestTypeLabel({ questType }: QuestTypeLabelProps) {
  return (
    <Box
      px={1}
      py={0.5}
      flexShrink={0}
      borderRadius={1}
      bgcolor={(theme) => alpha(theme.palette.common.black, 0.3)}
    >
      <Typography fontSize={12} color="white">
        {QUEST_TYPE[questType].shortLabel}
      </Typography>
    </Box>
  )
}
