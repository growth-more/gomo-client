import { QUEST_TYPE_LABEL } from '@/constants'
import { QuestType } from '@/entities'
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
        {QUEST_TYPE_LABEL[questType]}
      </Typography>
    </Box>
  )
}
