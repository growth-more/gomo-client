import { FallbackImage } from '@/components/fallback-image'
import { InterestLevelLabel, InterestScoreBar } from '@/components/interest'
import { MajorInterest } from '@/entities/interest'
import { Box, Stack, Tooltip, Typography } from '@mui/material'
import { colord } from 'colord'

interface MajorInterestItemProps {
  interest: MajorInterest
}

const ITEM_SIZE = 60

export function MajorInterestItem({ interest }: MajorInterestItemProps) {
  return (
    <Tooltip
      slotProps={{ tooltip: { sx: { p: 0.6 } } }}
      title={
        <Stack spacing={1}>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
            <Typography fontSize={14} fontWeight={600} pl={0.5}>
              {interest.name}
            </Typography>
            <InterestLevelLabel level={interest.level} />
          </Stack>
          <InterestScoreBar score={interest.score} scoreThreshold={interest.scoreThreshold} />
        </Stack>
      }
    >
      <Stack
        bgcolor="divider"
        width={ITEM_SIZE}
        height={ITEM_SIZE}
        flexShrink={0}
        borderRadius={1}
        border={1}
        borderColor="divider"
        justifyContent="center"
        alignItems="center"
        p={0.5}
        sx={{
          cursor: 'pointer',
          '&:hover': {
            bgcolor: (theme) => colord(theme.palette.divider).lighten(0.45).toHex(),
          },
        }}
      >
        <FallbackImage
          src={interest.logoUrl}
          sx={{ width: 1, height: 1, objectFit: 'contain', userSelect: 'none' }}
          draggable={false}
          fallback={<Box></Box>}
        />
      </Stack>
    </Tooltip>
  )
}
