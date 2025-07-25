import { IconButtons } from '@/components/icon-button'
import { Iconify } from '@/components/iconify'
import { useUpload } from '@/hooks'
import { Box, IconButton, Stack } from '@mui/material'

const DEFAULT_SIZE = 120

interface SelectInterestImageProps {
  file: File | null
  onChange?: (file: File | null) => void
  size?: number
  color?: string | null
  disableRemove?: boolean
  defaultImageSrc?: string
}

export function SelectInterestImage({
  file,
  onChange,
  size = DEFAULT_SIZE,
  color,
  disableRemove,
  defaultImageSrc,
}: SelectInterestImageProps) {
  const { upload } = useUpload({
    onSuccess: (files) => {
      if (files.length > 0) {
        onChange?.(files[0])
      }
    },
  })

  return (
    <Stack
      width={size}
      height={size}
      border={color ? 2 : 1}
      borderRadius={1}
      borderColor={(theme) => color ?? theme.palette.border.main}
      bgcolor={(theme) => theme.palette.background.main}
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      position="relative"
    >
      <IconButton sx={{ borderRadius: 0, width: 1, height: 1, p: 0.5 }} onClick={upload}>
        {!file && defaultImageSrc ? (
          <Box
            component="img"
            src={defaultImageSrc}
            alt="interest icon"
            sx={{ objectFit: 'cover', width: 1, height: 1, borderRadius: 1 }}
          />
        ) : file ? (
          <Box
            component="img"
            src={URL.createObjectURL(file)}
            alt="interest icon"
            sx={{ objectFit: 'cover', width: 1, height: 1, borderRadius: 1 }}
          />
        ) : (
          <Iconify icon="material-symbols:image" width={30} />
        )}
      </IconButton>

      {file && !disableRemove && (
        <IconButtons.Close
          sx={{
            width: 24,
            height: 24,
            position: 'absolute',
            right: 5,
            bottom: 5,
            border: 1,
            borderColor: (theme) => theme.palette.border.main,
            bgcolor: (theme) => theme.palette.background.main,
            '&:hover': {
              bgcolor: (theme) => theme.palette.background.dark,
              opacity: 1,
            },
            opacity: 0.8,
          }}
          onClick={() => onChange?.(null)}
        />
      )}
    </Stack>
  )
}
