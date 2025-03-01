import { Iconify } from '@/components/iconify'
import { useUpload } from '@/hooks'
import { Box, IconButton, Stack } from '@mui/material'

interface SelectInterestIconProps {
  file: File | null
  onChange?: (file: File) => void
}

export function SelectInterestIcon({ file, onChange }: SelectInterestIconProps) {
  const { upload } = useUpload({
    onSuccess: (files) => {
      if (files.length > 0) {
        onChange?.(files[0])
      }
    },
  })

  return (
    <Stack
      width={32}
      height={32}
      borderRadius={1}
      bgcolor={(theme) => theme.palette.grey[800]}
      alignItems="center"
      justifyContent="center"
    >
      <IconButton
        sx={{
          borderRadius: 1,
          width: 1,
          height: 1,
          color: (theme) => theme.palette.grey[400],
          p: 0.5,
          overflow: 'hidden',
        }}
        onClick={upload}
      >
        {file ? (
          <Box
            component="img"
            src={URL.createObjectURL(file)}
            alt="interest icon"
            sx={{ objectFit: 'cover', width: 1, height: 1 }}
          />
        ) : (
          <Iconify icon="material-symbols:image" />
        )}
      </IconButton>
    </Stack>
  )
}
