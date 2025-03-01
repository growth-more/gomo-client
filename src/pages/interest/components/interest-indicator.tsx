import { Interest } from '@/entities/interest'
import { alpha, Stack, Typography } from '@mui/material'
import { ScoreBar } from './score-bar'

interface InterestIndicatorProps {
  interest: Interest | null
}

export function InterestIndicator({ interest }: InterestIndicatorProps) {
  return (
    <Stack
      width={1}
      height={1}
      px={1}
      py={2}
      bgcolor={(theme) => alpha(theme.palette.common.black, 0.3)}
      borderRadius={1}
      spacing={1}
      color={(theme) => theme.palette.common.white}
    >
      {interest && (
        <>
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
        </>
      )}
    </Stack>
  )
}
