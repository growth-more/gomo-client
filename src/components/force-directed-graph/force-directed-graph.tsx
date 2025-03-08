import { Box } from '@mui/material'
import { Graph, Vertex } from './types'
import { useForceDirectedGraph } from '@/components/force-directed-graph/d3'

interface ForceDirectedGraphProps<V extends Vertex> {
  data: Graph<V>
  onSelect?: (interest: V | null) => void
}

export function ForceDirectedGraph<V extends Vertex>({
  data,
  onSelect,
}: ForceDirectedGraphProps<V>) {
  const { svgRef, onSvgClickHandler } = useForceDirectedGraph(data, onSelect)

  return (
    <Box
      component="svg"
      ref={svgRef}
      width={1}
      height={1}
      onClick={onSvgClickHandler}
      sx={{ userSelect: 'none' }}
    />
  )
}
