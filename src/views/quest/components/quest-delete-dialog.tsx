import { DangerDialog } from '@/components/modal'
import { Typography } from '@mui/material'

interface QuestDeleteDialogProps {
  onSuccess?: () => void
  onCancel?: () => void
}

export function QuestDeleteDialog({ onSuccess, onCancel }: QuestDeleteDialogProps) {
  return (
    <DangerDialog
      onSuccess={onSuccess}
      onCancel={onCancel}
      successLabel="퀘스트 포기"
      successColor="error"
    >
      <Typography fontSize={15} fontWeight={400}>
        퀘스트 포기 후에는 복구할 수 없습니다. 정말 퀘스트를 포기하시겠습니까?
      </Typography>
    </DangerDialog>
  )
}
