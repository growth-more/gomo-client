import { Interest } from '@/entities/interest'
import { alpha, Button, Stack, Typography } from '@mui/material'
import { ScoreBar } from './score-bar'
import { SelectInterest } from '@/pages/interest/components/select-interest'
import { useEffect, useState } from 'react'

interface InterestIndicatorProps {
  interest: Interest | null
  onDelete?: () => void
  getUpperInterest: (interest: Interest) => Interest | null
}

export function InterestIndicator({
  interest,
  onDelete,
  getUpperInterest,
}: InterestIndicatorProps) {
  const [upperInterest, setUpperInterest] = useState<Interest | null>(null)

  useEffect(() => {
    if (interest) {
      setUpperInterest(getUpperInterest(interest))
    }
  }, [interest, getUpperInterest])

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

            <Stack spacing={1} pt={2}>
              <Typography fontSize={14} fontWeight={600} pl={0.5}>
                상위 관심사
              </Typography>
              <SelectInterest value={upperInterest} onSelect={setUpperInterest} />
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="flex-end">
            <Button size="small" fullWidth color="error" onClick={onDelete}>
              삭제
            </Button>
          </Stack>
        </>
      )}
    </Stack>
  )
}
