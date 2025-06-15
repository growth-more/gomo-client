import { FormControl, FormControlProps, MenuItem, Select } from '@mui/material'
import range from 'lodash/range'

interface MonthSelectorProps extends Omit<FormControlProps, 'onChange'> {
  value: number
  onChange: (value: number) => void
}

export function MonthSelector({ value, onChange, ...formProps }: MonthSelectorProps) {
  const months = range(1, 13)

  return (
    <FormControl {...formProps}>
      {/* <InputLabel>월</InputLabel> */}
      <Select value={value} onChange={(e) => onChange(Number(e.target.value))}>
        {months.map((month) => (
          <MenuItem key={month} value={month}>
            {month}월
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
