import { SelectInterestColorCell } from './select-interest-color-cell'
import { SelectInterestColorCellNone } from './select-interest-color-cell-none'
import { Stack } from '@mui/material'

const COLOR_OPTIONS = ['#FB2C36', '#FF6900', '#FE9A00', '#5EA500', '#2B7FFF', '#4F39F6', '#8E51FF']

interface SelectInterestColorProps {
  color: string | null
  onChange: (color: string | null) => void
  enableNoneOption?: boolean
}

export function SelectInterestColor({
  color,
  onChange,
  enableNoneOption = true,
}: SelectInterestColorProps) {
  return (
    <Stack
      direction="row"
      spacing={0.5}
      border={1}
      borderColor={(theme) => theme.palette.border.main}
      borderRadius={1}
      p={1}
    >
      {enableNoneOption && (
        <SelectInterestColorCellNone selected={color === null} onClick={() => onChange(null)} />
      )}
      {COLOR_OPTIONS.map((option, i) => (
        <SelectInterestColorCell
          key={i}
          color={option}
          selected={color === option}
          onClick={() => onChange(option)}
        />
      ))}
    </Stack>
  )
}
