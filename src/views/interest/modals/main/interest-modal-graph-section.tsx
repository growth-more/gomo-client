import { ForceDirectedGraph } from '@/components/force-directed-graph'
import { Box, Stack } from '@mui/material'
import { useInterest } from '@/api/hooks'
import { Interest } from '@/entities/interest'
import { useEffect, useState } from 'react'
import { InterestGraphIndicator, InterestEmpty } from '@/views/interest/components'

export function InterestModalGraphSection() {
  const { interestGraph } = useInterest()

  const [selectedInterest, setSelectedInterest] = useState<Interest | null>(null)

  useEffect(() => {
    if (selectedInterest) {
      const vertex = interestGraph.vertex.find((v) => v.interest.id === selectedInterest.id)
      setSelectedInterest(vertex?.interest ?? null)
    }
  }, [interestGraph, selectedInterest])

  return (
    <Stack width={1} height={1} position="relative">
      {interestGraph.vertex.length === 0 ? (
        <Box width={1} height={1} p={2}>
          <InterestEmpty />
        </Box>
      ) : (
        <>
          <ForceDirectedGraph
            data={interestGraph}
            onSelect={(vertex) => setSelectedInterest(vertex?.interest ?? null)}
          />
          {selectedInterest && <InterestGraphIndicator interest={selectedInterest} />}
        </>
      )}
    </Stack>
  )
}
