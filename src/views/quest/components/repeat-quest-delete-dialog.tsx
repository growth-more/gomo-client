import { DangerDialog } from '@/components/modal'
import { Typography } from '@mui/material'

interface RepeatQuestDeleteDialogProps {
  onSuccess?: () => void
  onCancel?: () => void
}

export function RepeatQuestDeleteDialog({ onSuccess, onCancel }: RepeatQuestDeleteDialogProps) {
  return (
    <DangerDialog
      onSuccess={onSuccess}
      onCancel={onCancel}
      successLabel="반복퀘스트 삭제"
      successColor="error"
    >
      <Typography fontSize={15} fontWeight={400}>
        반복퀘스트 삭제 후에는 복구할 수 없습니다. 정말 반복퀘스트를 삭제하시겠습니까?
      </Typography>
    </DangerDialog>
  )
}
