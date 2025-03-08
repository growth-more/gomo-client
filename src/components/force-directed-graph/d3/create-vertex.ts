import { VERTEX } from '@/components/force-directed-graph/constants'
import { Vertex } from '@/components/force-directed-graph/types'
import { colord } from 'colord'
import * as d3 from 'd3'

export function createVertex<V extends Vertex>(
  selection: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  data: V[]
) {
  const vertex = selection
    .append('g')
    .selectAll()
    .data(data)
    .join('g')
    .attr('id', (d) => `${VERTEX.ID_PREFIX}${d.id}`)
    .attr('cursor', 'pointer')

  vertex
    .append('circle')
    .attr('r', (d) => d.size)
    .attr('fill', colord(VERTEX.FILL_COLOR).desaturate(VERTEX.FILL_DESATURATION).toHex())
    .attr('stroke', VERTEX.STROKE_COLOR)
    .attr('stroke-width', VERTEX.STROKE_WIDTH)
    .attr('x', (d) => d.x!)
    .attr('y', (d) => d.y!)

  vertex
    .append('text')
    .text((d) => d.name)
    .attr('fill', VERTEX.TEXT_COLOR)
    .attr('fill-opacity', VERTEX.TEXT_OPACITY)
    .attr('font-size', VERTEX.TEXT_SIZE)
    .attr('font-weight', VERTEX.TEXT_WEIGHT)
    .attr('x', (d) => d.size + VERTEX.TEXT_X_OFFSET)
    .attr('y', (d) => d.size * VERTEX.TEXT_Y_OFFSET)

  return vertex
}
