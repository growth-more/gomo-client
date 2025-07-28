import { EDGE } from '@/components/force-directed-graph/constants'
import { Edge, Vertex } from '@/components/force-directed-graph/types'

export function createEdge<V extends Vertex>(
  selection: d3.Selection<SVGGElement, unknown, null, undefined>,
  data: Edge<V>[]
) {
  const edge = selection
    .append('g')
    .selectAll()
    .data(data)
    .join('line')
    .attr('stroke', EDGE.STROKE_COLOR)
    .attr('stroke-width', EDGE.STROKE_WIDTH)
    .attr('stroke-opacity', EDGE.STROKE_OPACITY)
    .attr('id', (d) => `${EDGE.ID_PREFIX}${d.id}`)

  return edge
}
