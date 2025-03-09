import { useBoolean } from '@/hooks'
import { Box, SxProps, Theme } from '@mui/material'
import { HTMLAttributes, ReactNode } from 'react'

interface FallbackImageProps extends HTMLAttributes<HTMLImageElement> {
  src: string
  sx?: SxProps<Theme>
  fallback?: ReactNode
  fallbackSrc?: string
}

export function FallbackImage({ src, sx, fallback, fallbackSrc, ...props }: FallbackImageProps) {
  const isError = useBoolean()

  if (isError.value) {
    return fallback ?? <Box component="img" src={fallbackSrc} sx={sx} {...props} />
  }

  return (
    <Box
      component="img"
      src={src}
      sx={sx}
      onError={isError.onTrue}
      onLoad={isError.onFalse}
      {...props}
    />
  )
}
