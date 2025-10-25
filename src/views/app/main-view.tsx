import { Box, Button, Stack, SxProps, Theme, Typography, useMediaQuery } from '@mui/material'
import { OnlyAuth } from '@/auth/guard'
import { WidgetManager } from '@/components/widget'
import { WidgetCustomManager } from '@/components/widget/widget-custom'
import { useBoolean } from '@/hooks'
import { useMemo } from 'react'
import { useModalStore } from '@/stores/use-modal-store'
import { DANGER_DIALOG_ID, DangerDialog } from '@/components/modal'

const backgroundSx: SxProps<Theme> = {
  backgroundImage: 'url("/img/bg.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}

export function MainView() {
  const { addModal } = useModalStore()

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

  const customSaveHandler = () => {
    customMode.onFalse()
  }

  const cancelHandler = () => {
    addModal(
      DANGER_DIALOG_ID,
      <DangerDialog onSuccess={customMode.onFalse} successColor="error">
        <Typography fontSize={15} fontWeight={400}>
          위젯 편집 내용이 저장되지 않습니다. 정말 돌아가시겠습니까?
        </Typography>
      </DangerDialog>
    )
  }

  return (
    <OnlyAuth>
      <Box width={1} height="100vh" position="fixed" sx={backgroundSx} zIndex={-1} />

      <Stack width={1} alignItems="center" px={5} py={15}>
        {customMode.value ? (
          <WidgetCustomManager
            mediaWidth={mediaWidth}
            onSave={customSaveHandler}
            onCancel={cancelHandler}
          />
        ) : (
          <Stack spacing={10} alignItems="center">
            <WidgetManager mediaWidth={mediaWidth} />
            <Button sx={{ width: 150, p: 1, borderRadius: 100 }} onClick={customMode.onTrue}>
              위젯 편집
            </Button>
          </Stack>
        )}
      </Stack>
    </OnlyAuth>
  )
}
