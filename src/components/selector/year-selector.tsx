import { FormControl, FormControlProps, MenuItem, Select } from '@mui/material'
import range from 'lodash/range'

interface YearSelectorProps extends Omit<FormControlProps, 'onChange'> {
  value: number
  onChange: (value: number) => void
}

export function YearSelector({ value, onChange, ...formProps }: YearSelectorProps) {
  const currentYear = new Date().getFullYear()
  const years = range(currentYear, 2022, -1)

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
