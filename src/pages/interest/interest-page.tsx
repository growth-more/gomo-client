import { alpha, Box, Stack } from '@mui/material'
import { useInterest, useInterestGraph } from '@/api/hooks'
import { ForceDirectedGraph } from '@/components/force-directed-graph'
import { CreateInterest, InterestIndicator } from './components'
import { useState } from 'react'
import { Interest, InterestVertex } from '@/entities/interest'

export function InterestPage() {
  const { deleteInterest } = useInterest()
  const { interestGraph } = useInterestGraph()

  const [selectedInterest, setSelectedInterest] = useState<Interest | null>(null)

  const onSelectInterest = (vertex: InterestVertex | null) => {
    setSelectedInterest(vertex?.interest ?? null)
  }

  const onDeleteInterest = () => {
    if (selectedInterest) {
      deleteInterest({ id: selectedInterest.id })
      setSelectedInterest(null)
    }
  }

  return (
    <Stack
      width={1}
      height={1}
      direction="row"
      bgcolor={(theme) => alpha(theme.palette.common.black, 0.5)}
    >
      <Stack width={250} height={1} p={1} spacing={1}>
        <InterestIndicator interest={selectedInterest} onDelete={onDeleteInterest} />
        <CreateInterest />
      </Stack>
      <Box flex={1} height={1} p={1}>
        <ForceDirectedGraph data={interestGraph} onSelect={onSelectInterest} />
      </Box>
    </Stack>
  )
}
