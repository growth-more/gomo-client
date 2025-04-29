import { DangerDialog } from '@/components/modal'
import { Typography } from '@mui/material'

interface QuestConfirmDialogProps {
  onSuccess?: () => void
  onCancel?: () => void
}

export function QuestConfirmDialog({ onSuccess, onCancel }: QuestConfirmDialogProps) {
  return (
    <DangerDialog onSuccess={onSuccess} onCancel={onCancel} successLabel="퀘스트 수락">
      <Typography fontSize={15} fontWeight={400}>
        퀘스트 수락이 확정된 후에는 퀘스트 내용 변경, 퀘스트 포기가 불가능합니다. 정말
        수락하시겠습니까?
      </Typography>
    </DangerDialog>
  )
}
