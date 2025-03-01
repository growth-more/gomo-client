import { Stack } from '@mui/material'
import { useInterestGraph } from '@/api/hooks'
import { ForceDirectedGraph } from '@/components/force-directed-graph'

export function InterestPage() {
  const { interestGraph } = useInterestGraph()

  return (
    <Stack width={1} height={1}>
      <ForceDirectedGraph data={interestGraph} />
    </Stack>
  )
}
