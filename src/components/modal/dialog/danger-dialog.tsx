import { Button } from '@/components/button'
import { IconButtons } from '@/components/icon-button'
import { useModalStore } from '@/stores/use-modal-store'
import { Box, Dialog, Stack, Typography } from '@mui/material'
import { ReactNode } from 'react'

export const DANGER_DIALOG_ID = 'DANGER_DIALOG_MODAL'

interface DangerDialogProps {
  title?: string
  children?: ReactNode
  onSuccess?: () => void
  onCancel?: () => void
  successLabel?: string
  cancelLabel?: string
  successColor?: 'inherit' | 'error' | 'primary' | 'secondary' | 'success' | 'info' | 'warning'
}

export function DangerDialog({
  title = '경고',
  onSuccess,
  onCancel,
  children,
  successLabel = '확인',
  cancelLabel = '취소',
  successColor = 'primary',
}: DangerDialogProps) {
  const { removeModal } = useModalStore()

  const closeHandler = () => {
    onCancel?.()
    removeModal(DANGER_DIALOG_ID)
  }

  const successHandler = () => {
    onSuccess?.()
    removeModal(DANGER_DIALOG_ID)
  }

  return (
    <Dialog open maxWidth="xs" fullWidth>
      <Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          p={1}
          pl={2}
          bgcolor={(theme) => theme.palette.background.main}
          borderBottom={1}
          borderColor={(theme) => theme.palette.border.main}
        >
          <Typography variant="subtitle1">{title}</Typography>
          <IconButtons.Close onClick={closeHandler} />
        </Stack>
        <Box p={2} py={4}>
          {children}
        </Box>
        <Stack
          direction="row"
          p={1}
          spacing={1}
          justifyContent="flex-end"
          borderTop={1}
          borderColor={(theme) => theme.palette.border.main}
        >
          <Button.Plain label={cancelLabel} onClick={closeHandler} />
          <Button.Primary
            label={successLabel}
            onClick={successHandler}
            fontProps={{ fontSize: 14, fontWeight: 500 }}
            color={successColor}
          />
        </Stack>
      </Stack>
    </Dialog>
  )
}
