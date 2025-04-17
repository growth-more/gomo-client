import { Box, Stack, SxProps, Theme } from '@mui/material'
import { OnlyAuth } from '@/auth/guard'
import { Widget } from '@/components/widget'

const backgroundSx: SxProps<Theme> = {
  backgroundImage: 'url("/img/bg.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}

export function MainPage() {
  return (
    <OnlyAuth>
      <Box width={1} height="100vh" position="fixed" sx={backgroundSx} zIndex={-1} />
      <Stack width={1} alignItems="center" px={4} py={15}>
        <Box display="flex" gap="40px" flexWrap="wrap">
          <Widget title="오늘의 퀘스트" subtitle="10개 중 3개 완료" onAdd={() => {}} />
          <Widget title="오늘의 퀘스트" subtitle="10개 중 3개 완료" width={2} onAdd={() => {}} />
        </Box>
      </Stack>
    </OnlyAuth>
  )
}
