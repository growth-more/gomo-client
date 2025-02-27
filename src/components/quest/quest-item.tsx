import { alpha, Box, Stack, Theme, Typography } from '@mui/material'
import { QuestType } from '@/entities'
import { QuestTypeLabel, QuestPointLabel, QuestITemAction } from '@/components/quest'

const DEFAULT_HEIGHT = 100

interface QuestItemProps {
  content: string
  questType: QuestType
  labelColor?: string | ((theme: Theme) => string)
  point?: number
  score?: number

  useConfirm?: boolean
  useDelete?: boolean
  useEdit?: boolean
  useComplete?: boolean

  onConfirm?: () => void
  onDelete?: () => void
  onEdit?: () => void
  onComplete?: () => void
}

export function QuestItem({
  content,
  questType,
  labelColor,
  point,
  score,
  useConfirm,
  useDelete,
  useEdit,
  useComplete,
  onConfirm,
  onDelete,
  onEdit,
  onComplete,
}: QuestItemProps) {
  return (
    <Stack
      height={DEFAULT_HEIGHT}
      direction="row"
      bgcolor={(theme) => alpha(theme.palette.background.paper, 0.4)}
      border={1}
      borderRadius={1}
      borderColor="divider"
      sx={{ backdropFilter: 'blur(10px)' }}
      overflow="hidden"
    >
      <Box width="5px" height={1} flexShrink={0} bgcolor={labelColor} />

      <Stack p={1} width={1} justifyContent="space-between" overflow="hidden">
        <Stack direction="row" spacing={1} justifyContent="space-between">
          <Typography fontSize={14} color="text.secondary" noWrap>
            {content}
          </Typography>
          <QuestTypeLabel questType={questType} />
        </Stack>

        <Stack direction="row" justifyContent="space-between" height={30}>
          <Stack direction="row" spacing={0.5}>
            {score && <QuestPointLabel icon="solar:star-bold" point={score} />}
            {point && <QuestPointLabel icon="mingcute:coin-3-fill" point={point} />}
          </Stack>
          <QuestITemAction
            useConfirm={useConfirm}
            useDelete={useDelete}
            useEdit={useEdit}
            useComplete={useComplete}
            onConfirm={onConfirm}
            onDelete={onDelete}
            onEdit={onEdit}
            onComplete={onComplete}
          />
        </Stack>
      </Stack>
    </Stack>
  )
}
