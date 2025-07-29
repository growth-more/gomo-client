import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import {
  createEdge,
  createGlowFilter,
  createSimulation,
  createVertex,
  drag,
  initializeEdgeStyle,
  initializeVertexStyle,
  useForceDirectedGraphSelect,
} from '@/components/force-directed-graph/d3'
import { Graph, Vertex } from '@/components/force-directed-graph/types'
import { cloneDeep, debounce } from 'lodash'
import { useToggleSignal } from '@/hooks/use-toggle-signal'
import { ZOOM } from '@/components/force-directed-graph/constants'

export function useForceDirectedGraph<V extends Vertex>(
  data: Graph<V>,
  onSelect?: (interest: V | null) => void
) {
  const { value: resize, toggle: onResize } = useToggleSignal()

  const svgRef = useRef<SVGSVGElement>(null)
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null)
  const containerRef = useRef<d3.Selection<SVGGElement, unknown, null, undefined> | null>(null)

  const { setSelectedVertexId } = useForceDirectedGraphSelect(svgRef)

  const [graphData, setGraphData] = useState<Graph<V>>(cloneDeep(data))

  const zoomInHandler = useCallback(() => {
    if (!svgRef.current || !zoomRef.current) {
      return
    }
    d3.select(svgRef.current)
      .transition()
      .duration(ZOOM.TRANSITION_DURATION)
      .call(zoomRef.current.scaleBy, ZOOM.ZOOM_UNIT_SCALE)
  }, [])

  const zoomOutHandler = useCallback(() => {
    if (!svgRef.current || !zoomRef.current) {
      return
    }
    d3.select(svgRef.current)
      .transition()
      .duration(ZOOM.TRANSITION_DURATION)
      .call(zoomRef.current.scaleBy, 1 / ZOOM.ZOOM_UNIT_SCALE)
  }, [])

  const zoomResetHandler = useCallback(() => {
    if (!svgRef.current || !zoomRef.current) {
      return
    }
    d3.select(svgRef.current)
      .transition()
      .duration(ZOOM.TRANSITION_DURATION)
      .call(zoomRef.current.transform, d3.zoomIdentity.scale(ZOOM.INITIAL_SCALE))
  }, [])

  const centerGraphHandler = useCallback(() => {
    if (!svgRef.current || !zoomRef.current) {
      return
    }
    const width = svgRef.current.clientWidth
    const height = svgRef.current.clientHeight

    const centerTransform = d3.zoomIdentity
      .translate(width / 2, height / 2)
      .scale(ZOOM.INITIAL_SCALE)

    d3.select(svgRef.current)
      .transition()
      .duration(ZOOM.TRANSITION_DURATION)
      .call(zoomRef.current.transform, centerTransform)
  }, [])

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
      if (svgRef.current) {
        d3.select(svgRef.current).call(initializeVertexStyle).call(initializeEdgeStyle)
      }
      onUnselectHandler()
    },
    [onUnselectHandler]
  )

  useEffect(() => {
    setGraphData(cloneDeep(data))
  }, [data])

  useEffect(() => {
    if (!svgRef.current) {
      return
    }

    const width = svgRef.current.clientWidth
    const height = svgRef.current.clientHeight

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()
    svg.append('defs').call(createGlowFilter)

    // ZOOM CONTAINER
    const container = svg.append('g').attr('class', 'graph-container')
    containerRef.current = container

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([ZOOM.MIN_SCALE, ZOOM.MAX_SCALE])
      .on('zoom', (e) => {
        container.transition().duration(ZOOM.TRANSITION_DURATION).attr('transform', e.transform)
      })

    svg.call(zoom)
    zoomRef.current = zoom

    const edge = createEdge(container, graphData.edge)
    const vertex = createVertex(container, graphData.vertex)
    const simulation = createSimulation(graphData, width, height)

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
  }, [graphData, resize])

  useEffect(() => {
    const resizeObserver = new ResizeObserver(debounce(onResize, 500))
    resizeObserver.observe(svgRef.current!)
    return () => {
      resizeObserver.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    svgRef,
    onSvgClickHandler,
    zoomInHandler,
    zoomOutHandler,
    zoomResetHandler,
    centerGraphHandler,
  }
}
