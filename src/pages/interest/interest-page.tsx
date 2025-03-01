import { alpha, Box, Stack } from '@mui/material'
import { useInterestGraph } from '@/api/hooks'
import { ForceDirectedGraph } from '@/components/force-directed-graph'
import { CreateInterest } from './components'

export function InterestPage() {
  const { interestGraph } = useInterestGraph()

  return (
    <Stack
      width={1}
      height={1}
      direction="row"
      bgcolor={(theme) => alpha(theme.palette.common.black, 0.5)}
    >
      <Stack width={250} height={1} p={1} spacing={1}>
        <Stack width={1} height={1} borderRadius={1}></Stack>
        <CreateInterest />
      </Stack>
      <Box flex={1} height={1} p={1}>
        <ForceDirectedGraph data={interestGraph} />
      </Box>
    </Stack>
  )
}
