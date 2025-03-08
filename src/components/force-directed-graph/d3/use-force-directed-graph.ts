import { useWindowViewContext } from '@/components/window'
import { MouseEvent, useCallback, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import {
  createEdge,
  createGlowFilter,
  createSimulation,
  createVertex,
  drag,
  useForceDirectedGraphSelect,
} from '@/components/force-directed-graph/d3'
import { Graph, Vertex } from '@/components/force-directed-graph/types'

export function useForceDirectedGraph<V extends Vertex>(
  data: Graph<V>,
  onSelect?: (interest: V | null) => void
) {
  const { viewSize } = useWindowViewContext()

  const svgRef = useRef<SVGSVGElement>(null)
  const { setSelectedVertexId } = useForceDirectedGraphSelect(svgRef)

  const onSelectHandler = useCallback(
    (interest: V) => {
      setSelectedVertexId(interest.id)
      onSelect?.(interest)
    },
    [onSelect, setSelectedVertexId]
  )

  const onUnselectHandler = useCallback(() => {
    setSelectedVertexId(null)
    onSelect?.(null)
  }, [onSelect, setSelectedVertexId])

  const onSvgClickHandler = useCallback(
    (e: MouseEvent) => {
      const target = e.target as SVGElement
      if (target !== e.currentTarget) {
        return
      }
      onUnselectHandler()
    },
    [onUnselectHandler]
  )

  useEffect(() => {
    if (!svgRef.current) {
      return
    }

    const width = svgRef.current.clientWidth
    const height = svgRef.current.clientHeight

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()
    svg.append('defs').call(createGlowFilter)

    const edge = createEdge(svg, data.edge)
    const vertex = createVertex(svg, data.vertex)
    const simulation = createSimulation(data, width, height)

    vertex.call(drag(simulation, onSelectHandler))

    simulation.on('tick', () => {
      edge
        .attr('x1', (d) => (d.source as Vertex).x!)
        .attr('y1', (d) => (d.source as Vertex).y!)
        .attr('x2', (d) => (d.target as Vertex).x!)
        .attr('y2', (d) => (d.target as Vertex).y!)
      vertex.attr('transform', (d) => `translate(${d.x},${d.y})`)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, viewSize])

  return { svgRef, onSvgClickHandler }
}
