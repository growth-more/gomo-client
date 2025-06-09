import { Button } from '@/components/button'
import { IconButtons } from '@/components/icon-button'
import { InputAdornment, Stack, TextField } from '@mui/material'

interface UpdateFieldProps {
  label: string
  origin: string
  value: string
  onChange: (value: string) => void
  isHandle?: boolean
  onUpdate?: () => void
}

export function UpdateField({
  label,
  value,
  origin,
  onChange,
  isHandle,
  onUpdate,
}: UpdateFieldProps) {
  const refresh = () => {
    onChange(origin)
  }

  return (
    <Stack direction="row" spacing={2}>
      <TextField
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        size="small"
        sx={{ flex: 1 }}
        slotProps={{
          input: {
            startAdornment: isHandle ? (
              <InputAdornment position="start">@</InputAdornment>
            ) : undefined,
          },
        }}
      />
      <Stack direction="row" spacing={1}>
        <IconButtons.Refresh
          sx={{
            width: 40,
            height: 40,
            border: 1,
            borderColor: (theme) => theme.palette.border.main,
            bgcolor: (theme) => theme.palette.background.main,
          }}
          disabled={value === origin}
          onClick={refresh}
        />
        <Button.Primary
          disabled={value === origin}
          label="변경하기"
          sx={{ px: 2 }}
          onClick={onUpdate}
        />
      </Stack>
    </Stack>
  )
}
