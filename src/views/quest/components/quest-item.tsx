import { Checkbox } from '@/components/checkbox'
import { Iconify } from '@/components/iconify'
import { QUEST_TYPE_LABEL } from '@/constants'
import { QuestType } from '@/entities'
import { Box, Stack, Typography } from '@mui/material'

interface QuestListItemProps {
  questName: string
  questType: QuestType
  interestName: string
  interestPoint: number
  selected: boolean
  onChanged?: (checked: boolean) => void
}

export function QuestItem({
  questName,
  questType,
  interestName,
  interestPoint,
  selected,
  onChanged,
}: QuestListItemProps) {
  return (
    <Stack p={1}>
      <Stack direction="row" alignItems="center" gap={1}>
        <Checkbox defaultChecked={selected} onChanged={onChanged} disableCancel={selected} />
        <Typography fontSize={15} fontWeight={500} noWrap>
          {questName}
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" gap={1}>
        <Box width={30} />
        <Stack direction="row" alignItems="center">
          <Typography variant="caption">{QUEST_TYPE_LABEL[questType]}퀘스트</Typography>
          <Iconify icon="mdi:dot" sx={{ width: 15 }} width={15} />
          <Typography variant="caption">{interestName}</Typography>
          <Typography
            variant="caption"
            fontWeight={500}
            sx={{ ml: 0.5, color: (theme) => theme.palette.primary.main }}
          >
            +{interestPoint}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}
