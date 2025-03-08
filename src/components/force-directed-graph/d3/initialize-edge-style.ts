import { EDGE } from '@/components/force-directed-graph/constants'
import * as d3 from 'd3'

export function initializeEdgeStyle(
  selection: d3.Selection<SVGSVGElement, unknown, null, undefined>
) {
  const edge = selection
    .selectAll('line')
    .attr('stroke', EDGE.STROKE_COLOR)
    .attr('stroke-width', EDGE.STROKE_WIDTH)
    .attr('stroke-opacity', EDGE.STROKE_OPACITY)
    .attr('filter', null)

  return edge
}
