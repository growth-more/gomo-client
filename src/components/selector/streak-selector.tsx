import { FormControl, FormControlProps, MenuItem, Select } from '@mui/material'
import range from 'lodash/range'

interface StreakSelectorProps extends Omit<FormControlProps, 'onChange'> {
  startYear?: number
  value: number
  onChange?: (value: number) => void
}

export function StreakSelector({
  startYear = 2025,
  value,
  onChange,
  ...formProps
}: StreakSelectorProps) {
  const currentYear = new Date().getFullYear()
  const years = range(currentYear, startYear - 1, -1)

  return (
    <FormControl {...formProps}>
      <Select value={value} onChange={(e) => onChange?.(Number(e.target.value))}>
        <MenuItem value={-1}>최근</MenuItem>
        {years.map((year) => (
          <MenuItem key={year} value={year}>
            {year}년
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
