import { ForceDirectedGraph } from '@/components/force-directed-graph'
import { Stack } from '@mui/material'
import { useInterestGraph } from '@/api/hooks'
import { Interest } from '@/entities/interest'
import { useEffect, useState } from 'react'
import { InterestGraphIndicator } from '@/views/interest/components'

export function InterestModalGraphSection() {
  const { interestGraph } = useInterestGraph()

  const [selectedInterest, setSelectedInterest] = useState<Interest | null>(null)

  useEffect(() => {
    if (selectedInterest) {
      const vertex = interestGraph.vertex.find((v) => v.interest.id === selectedInterest.id)
      setSelectedInterest(vertex?.interest ?? null)
    }
  }, [interestGraph, selectedInterest])

  return (
    <Stack width={1} height={1} position="relative">
      <ForceDirectedGraph
        data={interestGraph}
        onSelect={(vertex) => setSelectedInterest(vertex?.interest ?? null)}
      />
      {selectedInterest && <InterestGraphIndicator interest={selectedInterest} />}
    </Stack>
  )
}
