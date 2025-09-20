import { Box, Button, Stack, SxProps, Theme, useMediaQuery } from '@mui/material'
import { OnlyAuth } from '@/auth/guard'
import { WidgetCustomGrid, WidgetCustomList, WidgetManager } from '@/components/widget'
import { useBoolean } from '@/hooks'
import { useMemo } from 'react'

const backgroundSx: SxProps<Theme> = {
  backgroundImage: 'url("/img/bg.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}

export function MainView() {
  const x3 = useMediaQuery('(min-width: 1210px)')
  const x2 = useMediaQuery('(min-width: 820px)')

  const mediaWidth = useMemo(() => {
    if (x3) {
      return 3
    }
    if (x2) {
      return 2
    }
    return 1
  }, [x3, x2])

  const customMode = useBoolean()

  const customButtonHandler = () => {
    if (customMode.value) {
      // save api
      customMode.onFalse()
      return
    }
    customMode.onTrue()
  }

  return (
    <OnlyAuth>
      <Box width={1} height="100vh" position="fixed" sx={backgroundSx} zIndex={-1} />

      <Stack width={1} alignItems="center" px={5} py={15}>
        {customMode.value ? (
          <WidgetCustomGrid mediaWidth={mediaWidth} />
        ) : (
          <>
            <WidgetManager mediaWidth={mediaWidth} />
            <Button
              sx={{ width: 150, p: 1, borderRadius: 100, mt: 10 }}
              onClick={customButtonHandler}
            >
              {customMode.value ? '완료' : '위젯 편집'}
            </Button>
          </>
        )}
      </Stack>
      {customMode.value && <WidgetCustomList />}
    </OnlyAuth>
  )
}
