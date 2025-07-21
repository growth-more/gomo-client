import { FormControl, FormControlProps, MenuItem, Select } from '@mui/material'
import range from 'lodash/range'

interface YearSelectorProps extends Omit<FormControlProps, 'onChange'> {
  startYear?: number
  endYear?: number
  value: number
  onChange: (value: number) => void
}

export function YearSelector({
  startYear = 2025,
  endYear = new Date().getFullYear(),
  value,
  onChange,
  ...formProps
}: YearSelectorProps) {
  const years = range(endYear, startYear - 1, -1)

  return (
    <FormControl {...formProps}>
      {/* <InputLabel>연도</InputLabel> */}
      <Select value={value} onChange={(e) => onChange(Number(e.target.value))}>
        {years.map((year) => (
          <MenuItem key={year} value={year}>
            {year}년
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
