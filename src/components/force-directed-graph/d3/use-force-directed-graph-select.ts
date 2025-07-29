import { RefObject, useEffect, useState } from 'react'
import * as d3 from 'd3'
import { unselectEdgeStyle, unselectVertexStyle } from '@/components/force-directed-graph/d3'
import { EDGE, GLOW_FILTER, VERTEX } from '@/components/force-directed-graph/constants'
import { Edge, Vertex } from '@/components/force-directed-graph/types'
import { colord } from 'colord'

export function useForceDirectedGraphSelect<V extends Vertex>(svgRef: RefObject<SVGSVGElement>) {
  const [selectedVertexId, setSelectedVertexId] = useState<string | null>(null)

  useEffect(() => {
    if (!svgRef.current) {
      return
    }
    if (selectedVertexId === null) {
      return
    }

    const svg = d3.select(svgRef.current).call(unselectEdgeStyle).call(unselectVertexStyle)
    const vertex = svg.selectAll<SVGGElement, V>(`#${VERTEX.ID_PREFIX}${selectedVertexId}`)
    const edge = svg.selectAll<SVGLineElement, Edge<V>>('line')

    vertex
      .select('circle.vertex-fill')
      .attr('filter', `url(#${GLOW_FILTER.ID})`)
      .attr('fill', (d) => colord(d.color ?? VERTEX.FILL_COLOR).toHex())

    vertex
      .select('circle.vertex-outline')
      .attr('stroke', (d) => colord(d.color ?? VERTEX.FILL_COLOR).toHex())
      .attr('filter', `url(#${GLOW_FILTER.ID})`)

    vertex
      .select('text')
      .attr('fill-opacity', VERTEX.SELECTED.TEXT_OPACITY)
      .attr('font-weight', VERTEX.SELECTED.TEXT_WEIGHT)

    edge
      .filter((d) => (d.target as Vertex).id === selectedVertexId)
      .attr('stroke', (d) => colord((d.target as Vertex).color ?? EDGE.STROKE_COLOR).toHex())
      .attr('stroke-opacity', EDGE.SELECTED.STROKE_OPACITY)
      .attr('stroke-width', EDGE.SELECTED.STROKE_WIDTH)
      .attr('filter', `url(#${GLOW_FILTER.ID})`)

    edge
      .filter((d) => (d.source as Vertex).id === selectedVertexId)
      .attr('stroke', (d) => colord((d.source as Vertex).color ?? EDGE.STROKE_COLOR).toHex())
      .attr('stroke-opacity', EDGE.SELECTED.STROKE_OPACITY)
      .attr('stroke-width', EDGE.SELECTED.STROKE_WIDTH)
      .attr('filter', `url(#${GLOW_FILTER.ID})`)
  }, [selectedVertexId, svgRef])

  return { selectedVertexId, setSelectedVertexId }
}
