import { DangerDialog } from '@/components/modal'
import { Typography } from '@mui/material'

interface InterestDeleteDialogProps {
  onSuccess?: () => void
  onCancel?: () => void
}

export function InterestDeleteDialog({ onSuccess, onCancel }: InterestDeleteDialogProps) {
  return (
    <DangerDialog
      onSuccess={onSuccess}
      onCancel={onCancel}
      successLabel="관심사 삭제"
      successColor="error"
    >
      <Typography fontSize={15} fontWeight={400}>
        관심사 삭제 후에는 복구할 수 없습니다. 정말 관심사를 삭제하시겠습니까?
      </Typography>
    </DangerDialog>
  )
}
