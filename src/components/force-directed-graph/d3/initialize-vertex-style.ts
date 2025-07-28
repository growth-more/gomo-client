import { VERTEX } from '@/components/force-directed-graph/constants'
import { Vertex } from '@/components/force-directed-graph/types'
import { colord } from 'colord'
import * as d3 from 'd3'

export function initializeVertexStyle(
  selection: d3.Selection<SVGSVGElement, unknown, null, undefined>
) {
  selection
    .selectAll<SVGGElement, Vertex>('circle.vertex-fill')
    .attr('fill', (d) => colord(d.color ?? VERTEX.FILL_COLOR).toHex())
    .attr('filter', null)

  selection
    .selectAll<SVGGElement, Vertex>('circle.vertex-outline')
    .attr('stroke', (d) => colord(d.color ?? VERTEX.FILL_COLOR).toHex())
    .attr('filter', null)

  selection
    .selectAll('text')
    .attr('fill-opacity', VERTEX.TEXT_OPACITY)
    .attr('font-weight', VERTEX.TEXT_WEIGHT)
}

export function unselectVertexStyle(
  selection: d3.Selection<SVGSVGElement, unknown, null, undefined>
) {
  selection
    .selectAll<SVGGElement, Vertex>('circle.vertex-fill')
    .attr('fill', (d) =>
      colord(d.color ?? VERTEX.FILL_COLOR)
        .desaturate(VERTEX.FILL_DESATURATION)
        .toHex()
    )
    .attr('filter', null)

  selection
    .selectAll<SVGGElement, Vertex>('circle.vertex-outline')
    .attr('stroke', (d) =>
      colord(d.color ?? VERTEX.FILL_COLOR)
        .desaturate(VERTEX.FILL_DESATURATION)
        .toHex()
    )
    .attr('filter', null)
}
