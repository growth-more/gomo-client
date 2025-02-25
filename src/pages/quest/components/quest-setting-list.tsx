import { NumberInput } from '@/components/input'
import { alpha, Stack, Typography } from '@mui/material'

interface QuestSettingListProps {
  title: string
  value: number
  onChange?: (value: number) => void
}

export function QuestSettingList({ title, value, onChange }: QuestSettingListProps) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      bgcolor={(theme) => alpha(theme.palette.background.paper, 0.4)}
      p={1}
      border={1}
      borderColor="divider"
      borderRadius={1}
    >
      <Typography variant="subtitle2" color="text.secondary">
        {title}
      </Typography>
      <NumberInput indicator min={0} unit="개" value={value} onChange={onChange} />
    </Stack>
  )
}
