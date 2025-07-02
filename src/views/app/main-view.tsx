import { Box, Stack, SxProps, Theme } from '@mui/material'
import { OnlyAuth } from '@/auth/guard'
import { WidgetManager } from '@/views/app/components/widget-manager'

const backgroundSx: SxProps<Theme> = {
  backgroundImage: 'url("/img/bg.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}

export function MainView() {
  return (
    <OnlyAuth>
      <Box width={1} height="100vh" position="fixed" sx={backgroundSx} zIndex={-1} />
      <Stack width={1} alignItems="center" px={5} py={15}>
        <WidgetManager />
      </Stack>
    </OnlyAuth>
  )
}
