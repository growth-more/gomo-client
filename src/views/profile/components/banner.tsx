import { useBoolean } from '@/hooks'
import { Box, SxProps, Theme } from '@mui/material'
import { useMemo } from 'react'

interface BannerProps {
  src: string
}

const bannerSx: SxProps<Theme> = {
  width: 1,
  aspectRatio: 3.5,
}

export function Banner({ src }: BannerProps) {
  const isFallback = useBoolean()

  const bannerRender = useMemo(() => {
    if (!src || isFallback.value) {
      return <Box component="img" src="./img/profile-bg.jpg" sx={bannerSx} />
    }
    return <Box component="img" src={src} sx={bannerSx} onError={isFallback.onTrue} />
  }, [src, isFallback])

  return bannerRender
}
