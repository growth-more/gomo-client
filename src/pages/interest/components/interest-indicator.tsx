import { Interest } from '@/entities/interest'
import { alpha, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { ScoreBar } from './score-bar'
import { Iconify } from '@/components/iconify'

interface InterestIndicatorProps {
  interest: Interest | null
  onDelete?: () => void
}

export function InterestIndicator({ interest, onDelete }: InterestIndicatorProps) {
  return (
    <Stack
      width={1}
      height={1}
      p={1}
      bgcolor={(theme) => alpha(theme.palette.common.black, 0.2)}
      borderRadius={1}
      spacing={1}
      color={(theme) => theme.palette.common.white}
    >
      {interest && (
        <>
          <Stack flex={1} spacing={1} py={1}>
            <Stack
              pl={0.5}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={1}
            >
              <Typography fontSize={16} fontWeight={600} noWrap>
                {interest.name}
              </Typography>
              <Typography
                fontSize={12}
                fontWeight={400}
                px={1}
                py={0.5}
                bgcolor={(theme) => theme.palette.grey[900]}
                borderRadius={1}
              >
                LV {interest.level}
              </Typography>
            </Stack>
            <ScoreBar score={interest.score} scoreThreshold={interest.scoreThreshold} />
          </Stack>
          <Stack direction="row" justifyContent="flex-end">
            <Tooltip title="관심사 삭제">
              <IconButton color="error" onClick={onDelete}>
                <Iconify icon="mdi:trash-can" />
              </IconButton>
            </Tooltip>
          </Stack>
        </>
      )}
    </Stack>
  )
}
