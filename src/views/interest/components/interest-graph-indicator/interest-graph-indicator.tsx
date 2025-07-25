import { useInterest } from '@/api/hooks'
import { useContextMenu } from '@/components/context-menu'
import { IconButtons } from '@/components/icon-button'
import { Interest } from '@/entities/interest'
import { InterestGraphIndicatorImage } from '@/views/interest/components/interest-graph-indicator/interest-graph-indicator-image'
import { InterestGraphIndicatorLevel } from '@/views/interest/components/interest-graph-indicator/interest-graph-indicator-level'
import { InterestGraphIndicatorScoreBar } from '@/views/interest/components/interest-graph-indicator/interest-graph-indicator-score-bar'
import { InterestGraphIndicatorTag } from '@/views/interest/components/interest-graph-indicator/interest-graph-indicator-tag'
import { useInterestGraphIndicatorContextMenu } from '@/views/interest/components/interest-graph-indicator/use-interest-graph-indicator-context-menu'
import { Box, Stack, Typography } from '@mui/material'
import { useMemo } from 'react'

interface InterestGraphIndicatorProps {
  interest: Interest
}

export function InterestGraphIndicator({ interest }: InterestGraphIndicatorProps) {
  const { interestGraph } = useInterest()

  const { contextMenu } = useInterestGraphIndicatorContextMenu(interest)
  const onContextMenu = useContextMenu(contextMenu)

  const upperInterests = useMemo(() => {
    const sources = interestGraph.edge.filter((e) => e.target === interest.id).map((e) => e.source)
    return interestGraph.vertex.filter((v) => sources.includes(v.id)).map((v) => v.interest)
  }, [interestGraph, interest])

  const lowerInterests = useMemo(() => {
    const targets = interestGraph.edge.filter((e) => e.source === interest.id).map((e) => e.target)
    return interestGraph.vertex.filter((v) => targets.includes(v.id)).map((v) => v.interest)
  }, [interestGraph, interest])

  return (
    <Stack
      p={1}
      width={320}
      position="absolute"
      right={10}
      bottom={10}
      border={1}
      borderRadius={1}
      borderColor={(theme) => theme.palette.border.main}
      bgcolor={(theme) => theme.palette.background.light}
      spacing={1}
      onContextMenu={onContextMenu}
    >
      <Stack direction="row" spacing={1}>
        <InterestGraphIndicatorImage src={interest.logoUrl} />
        <Stack flex={1} justifyContent="space-between">
          {/* 레벨, 제목, 메뉴 */}
          <Stack direction="row" justifyContent="space-between" spacing={1}>
            <Stack direction="row" spacing={1} alignItems="center">
              <InterestGraphIndicatorLevel level={interest.level} />
              <Typography fontWeight={600} fontSize={16} noWrap>
                {interest.name}
              </Typography>
            </Stack>
            <IconButtons.Menu onClick={onContextMenu} />
          </Stack>
          <InterestGraphIndicatorScoreBar
            score={interest.score}
            scoreThreshold={interest.scoreThreshold}
          />
        </Stack>
      </Stack>

      {upperInterests.length > 0 && lowerInterests.length > 0 && (
        <>
          <Box width={1} borderBottom={1} borderColor={(theme) => theme.palette.border.main} />
          <Stack direction="row" gap={0.5} flexWrap="wrap">
            {upperInterests.map((interest) => (
              <InterestGraphIndicatorTag key={interest.id} tag={interest.name} isUpper />
            ))}
            {lowerInterests.map((interest) => (
              <InterestGraphIndicatorTag key={interest.id} tag={interest.name} />
            ))}
          </Stack>
        </>
      )}
    </Stack>
  )
}
