import { RefObject, useEffect, useState } from 'react'
import * as d3 from 'd3'
import { initializeEdgeStyle, initializeVertexStyle } from '@/components/force-directed-graph/d3'
import { EDGE, GLOW_FILTER, VERTEX } from '@/components/force-directed-graph/constants'
import { Edge, Vertex } from '@/components/force-directed-graph/types'

export function useForceDirectedGraphSelect<V extends Vertex>(svgRef: RefObject<SVGSVGElement>) {
  const [selectedVertexId, setSelectedVertexId] = useState<string | null>(null)

  useEffect(() => {
    if (!svgRef.current) {
      return
    }

    const svg = d3.select(svgRef.current).call(initializeEdgeStyle).call(initializeVertexStyle)
    const vertex = svg.select(`#${VERTEX.ID_PREFIX}${selectedVertexId}`)
    const edge = svg.selectAll<SVGLineElement, Edge<V>>('line')

    vertex
      .select('circle')
      .attr('filter', `url(#${GLOW_FILTER.ID})`)
      .attr('fill', VERTEX.FILL_COLOR)

    vertex
      .select('text')
      .attr('fill-opacity', VERTEX.SELECTED.TEXT_OPACITY)
      .attr('font-weight', VERTEX.SELECTED.TEXT_WEIGHT)

    edge
      .filter((d) => (d.target as Vertex).id === selectedVertexId)
      .attr('stroke', EDGE.SELECTED.TARGET_STROKE_COLOR)
      .attr('stroke-opacity', EDGE.SELECTED.STROKE_OPACITY)
      .attr('stroke-width', EDGE.SELECTED.STROKE_WIDTH)
      .attr('filter', `url(#${GLOW_FILTER.ID})`)

    edge
      .filter((d) => (d.source as Vertex).id === selectedVertexId)
      .attr('stroke', EDGE.SELECTED.SOURCE_STROKE_COLOR)
      .attr('stroke-opacity', EDGE.SELECTED.STROKE_OPACITY)
      .attr('stroke-width', EDGE.SELECTED.STROKE_WIDTH)
      .attr('filter', `url(#${GLOW_FILTER.ID})`)
  }, [selectedVertexId, svgRef])

  return { selectedVertexId, setSelectedVertexId }
}
