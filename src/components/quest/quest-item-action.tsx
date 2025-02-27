import { IconButton, Stack, Tooltip } from '@mui/material'
import { useMemo } from 'react'
import { Iconify } from '@/components/iconify'

interface QuestItemActionProps {
  useConfirm?: boolean
  useDelete?: boolean
  useEdit?: boolean
  useComplete?: boolean

  onConfirm?: () => void
  onDelete?: () => void
  onEdit?: () => void
  onComplete?: () => void
}

export function QuestITemAction({
  useConfirm,
  useDelete,
  useEdit,
  useComplete,
  onConfirm,
  onDelete,
  onEdit,
  onComplete,
}: QuestItemActionProps) {
  const actionBtn = (tooltip: string, icon: string, clickHandler?: () => void) => {
    return (
      <Tooltip title={tooltip}>
        <IconButton size="small" onClick={clickHandler}>
          <Iconify icon={icon} />
        </IconButton>
      </Tooltip>
    )
  }

  const actionRender = useMemo(() => {
    const result = []
    if (useDelete) {
      result.push(actionBtn('퀘스트 삭제', 'material-symbols:close-rounded', onDelete))
    }
    if (useEdit) {
      result.push(actionBtn('퀘스트 수정', 'lets-icons:edit', onEdit))
    }
    if (useConfirm) {
      result.push(actionBtn('퀘스트 수락', 'mdi:check', onConfirm))
    }
    if (useComplete) {
      result.push(actionBtn('퀘스트 완료', 'mdi:check', onComplete))
    }
    return result
  }, [onComplete, onConfirm, onDelete, onEdit, useComplete, useConfirm, useDelete, useEdit])

  return (
    <Stack direction="row" spacing={0.5}>
      {actionRender}
    </Stack>
  )
}
