import { IconButton, Stack, Typography } from '@mui/material'
import { Iconify } from '@/components/iconify'
import { useMemo, useState } from 'react'

interface NumberInputProps {
  value?: number
  onChange?: (value: number) => void
  defaultValue?: number
  unit?: string
  unitPosition?: 'left' | 'right'
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  indicator?: boolean
}

export function NumberInput({
  indicator,
  onChange,
  defaultValue = 0,
  unit,
  unitPosition = 'right',
  min,
  max,
  step = 1,
  disabled = false,
  ...props
}: NumberInputProps) {
  const [innerValue, setInnerValue] = useState(defaultValue)

  const value = useMemo(() => {
    if (props.value !== undefined) {
      return props.value
    }
    return innerValue
  }, [props.value, innerValue])

  const addHandler = () => {
    const res = max !== undefined ? Math.min(max, value + step) : value + step
    if (!props.value) {
      setInnerValue(res)
    }
    onChange?.(res)
  }

  const subHandler = () => {
    const res = min !== undefined ? Math.max(min, value - step) : value - step
    if (!props.value) {
      setInnerValue(res)
    }
    onChange?.(res)
  }

  return (
    <Stack
      direction="row"
      alignItems="center"
      border={1}
      borderRadius={1}
      borderColor={(theme) => theme.palette.border.main}
    >
      {indicator && (
        <IconButton
          sx={{
            borderRadius: 0,
            borderRight: 1,
            borderColor: (theme) => theme.palette.border.main,
          }}
          onClick={subHandler}
          disabled={disabled}
        >
          <Iconify icon="mdi:minus" />
        </IconButton>
      )}
      <Stack
        minWidth={50}
        minHeight={36}
        justifyContent="center"
        alignItems="center"
        direction={unitPosition === 'left' ? 'row-reverse' : 'row'}
        spacing={0.2}
        bgcolor={(theme) => theme.palette.background.light}
      >
        <Typography variant="subtitle2" color={disabled ? 'text.disabled' : 'text.secondary'}>
          {value}
        </Typography>
        {unit && (
          <Typography variant="subtitle2" color={disabled ? 'text.disabled' : 'text.secondary'}>
            {unit}
          </Typography>
        )}
      </Stack>
      {indicator && (
        <IconButton
          sx={{
            borderRadius: 0,
            borderLeft: 1,
            borderColor: (theme) => theme.palette.border.main,
          }}
          onClick={addHandler}
          disabled={disabled}
        >
          <Iconify icon="mdi:plus" />
        </IconButton>
      )}
    </Stack>
  )
}
