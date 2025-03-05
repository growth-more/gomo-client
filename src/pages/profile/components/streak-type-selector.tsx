import { VerticalSelector, VerticalSelectorOption } from '@/components/selector'
import { StreakType } from '@/entities/streak'
import { SxProps, Theme } from '@mui/material'

interface StreakTypeSelectorProps {
  value: StreakType
  onChange: (value: StreakType) => void
  sx?: SxProps<Theme>
}

export function StreakTypeSelector({ value, onChange, sx }: StreakTypeSelectorProps) {
  const options: VerticalSelectorOption<StreakType>[] = [
    { label: '전체', value: 'ALL' },
    { label: '일일', value: 'DAILY' },
    { label: '주간', value: 'WEEKLY' },
    { label: '월간', value: 'MONTHLY' },
  ]

  return <VerticalSelector options={options} value={value} onChange={onChange} sx={sx} />
}
