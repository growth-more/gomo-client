import { useInterest } from '@/api/hooks'
import { Iconify } from '@/components/iconify'
import { Interest } from '@/entities/interest'
import { Autocomplete, TextField } from '@mui/material'

interface SelectInterestProps {
  value: Interest | null
  onSelect?: (interest: Interest | null) => void
  placeholder?: string
}

export function SelectInterest({ value, onSelect, placeholder }: SelectInterestProps) {
  const { interests } = useInterest()

  return (
    <Autocomplete
      options={interests}
      onChange={(_, value) => onSelect?.(value)}
      getOptionLabel={(option) => option.name}
      size="small"
      color="white"
      sx={{ bgcolor: (theme) => theme.palette.grey[800] }}
      popupIcon={<Iconify icon="material-symbols:arrow-drop-down" color="white" />}
      value={value}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          sx={{
            color: 'white',
            '& .MuiInputBase-input': {
              color: 'white',
            },
            '& .MuiInputBase-input::placeholder': {
              color: 'white',
            },
            '& .MuiAutocomplete-clearIndicator': {
              color: 'white',
            },
          }}
        />
      )}
    />
  )
}
