import { NumberInput } from '@/components/input'
import { Stack, Typography } from '@mui/material'

interface QuestModalSettingListProps {
  title: string
  value: number
  onChange?: (value: number) => void
}

export function QuestModalSettingList({ title, value, onChange }: QuestModalSettingListProps) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography fontSize={14} fontWeight={500}>
        {title}
      </Typography>
      <NumberInput indicator min={0} unit="개" value={value} onChange={onChange} />
    </Stack>
  )
}
