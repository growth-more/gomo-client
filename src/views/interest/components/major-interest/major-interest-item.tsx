import { useGetOneInterest } from '@/api/hooks/interest/use-get-one-interest'
import { useContextMenu } from '@/components/context-menu'
import { IconButtons } from '@/components/icon-button'
import { MajorInterest } from '@/entities/interest'
import { InterestGraphIndicatorImage } from '@/views/interest/components/interest-graph-indicator/interest-graph-indicator-image'
import { InterestGraphIndicatorLevel } from '@/views/interest/components/interest-graph-indicator/interest-graph-indicator-level'
import { InterestGraphIndicatorScoreBar } from '@/views/interest/components/interest-graph-indicator/interest-graph-indicator-score-bar'
import { useMajorInterestItemContextMenu } from '@/views/interest/components/major-interest/use-major-interest-item-context-menu'
import { Box, Stack, Typography } from '@mui/material'

interface MajorInterestItemProps {
  majorInterest: MajorInterest
}

export function MajorInterestItem({ majorInterest }: MajorInterestItemProps) {
  const { interest } = useGetOneInterest(majorInterest.interestId)
  const { contextMenu } = useMajorInterestItemContextMenu(interest)

  const onContextMenu = useContextMenu(contextMenu)

  console.log(interest)

  return (
    <Stack
      direction="row"
      p={1}
      spacing={1}
      flex={1}
      minWidth={300}
      border={1}
      borderRadius={1}
      borderColor={(theme) => theme.palette.border.main}
    >
      <InterestGraphIndicatorImage src={majorInterest.logoUrl} />
      <Stack flex={1} justifyContent="space-between">
        <Box
          display="grid"
          alignItems="center"
          gridTemplateColumns="auto minmax(0, 1fr) auto"
          gap={1}
        >
          <InterestGraphIndicatorLevel level={majorInterest.level} />
          <Typography fontWeight={600} fontSize={16} noWrap textAlign="left">
            {majorInterest.name}
          </Typography>
          <IconButtons.Menu onClick={onContextMenu} />
        </Box>
        <InterestGraphIndicatorScoreBar
          score={majorInterest.score}
          scoreThreshold={majorInterest.scoreThreshold}
        />
      </Stack>
    </Stack>
  )
}
