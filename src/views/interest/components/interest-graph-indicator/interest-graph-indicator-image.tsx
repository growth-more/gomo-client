import { FallbackImage } from '@/components/fallback-image'
import { Iconify } from '@/components/iconify'
import { Stack } from '@mui/material'

const DEFAULT_SIZE = 70

interface InterestGraphIndicatorImageProps {
  src?: string | null
  color?: string | null
  size?: number
}

export function InterestGraphIndicatorImage({
  src,
  color,
  size = DEFAULT_SIZE,
}: InterestGraphIndicatorImageProps) {
  return (
    <Stack
      width={size}
      height={size}
      border={color ? 2 : 1}
      flexShrink={0}
      borderRadius={1}
      borderColor={(theme) => color ?? theme.palette.border.main}
      bgcolor={(theme) => theme.palette.background.main}
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
    >
      {src ? (
        <FallbackImage
          src={src}
          sx={{ objectFit: 'cover', width: 1, height: 1, borderRadius: 1 }}
          fallback={<Iconify icon="material-symbols:image" width={30} />}
        />
      ) : (
        <Iconify icon="material-symbols:image" width={30} />
      )}
    </Stack>
  )
}
