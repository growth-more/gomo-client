import { useWindowViewContext } from '@/components/window'
import { Box } from '@mui/material'
import * as d3 from 'd3'
import { useEffect, useRef, useState } from 'react'
import { Graph, Vertex, Edge } from './types'
import { colord } from 'colord'
interface ForceDirectedGraphProps<V extends Vertex> {
  data: Graph<V>
  onSelect?: (interest: V | null) => void
}

export function ForceDirectedGraph<V extends Vertex>({
  data,
  onSelect,
}: ForceDirectedGraphProps<V>) {
  const { viewSize } = useWindowViewContext()

  const [selectedVertexId, setSelectedVertexId] = useState<string | null>(null)

  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) {
      return
    }
    const svg = d3.select(svgRef.current)

    svg
      .selectAll('circle')
      .attr('filter', null)
      .attr('fill', colord('#4f39f6').desaturate(0.6).toHex())
    svg.selectAll('text').attr('fill-opacity', 0.3).attr('font-weight', 400)
    svg
      .select(`#vertex-${selectedVertexId}`)
      .select('circle')
      .attr('filter', 'url(#glow)')
      .attr('fill', '#4f39f6')
    svg
      .select(`#vertex-${selectedVertexId}`)
      .select('text')
      .attr('fill-opacity', 1)
      .attr('font-weight', 600)

    svg
      .selectAll('line')
      .attr('stroke', '#999')
      .attr('stroke-width', 1.5)
      .attr('stroke-opacity', 0.6)
      .attr('filter', null)
    svg
      .selectAll<SVGLineElement, Edge<V>>('line')
      .filter((d) => (d.target as Vertex).id === selectedVertexId)
      .attr('stroke', 'white')
      .attr('stroke-opacity', 1)
      .attr('stroke-width', 3)
      .attr('filter', 'url(#glow)')
    svg
      .selectAll<SVGLineElement, Edge<V>>('line')
      .filter((d) => (d.source as Vertex).id === selectedVertexId)
      .attr('stroke', 'yellow')
      .attr('stroke-opacity', 1)
      .attr('stroke-width', 3)
      .attr('filter', 'url(#glow)')
  }, [selectedVertexId])

  useEffect(() => {
    if (!svgRef.current) {
      return
    }

    const width = svgRef.current.clientWidth
    const height = svgRef.current.clientHeight

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const defs = svg.append('defs')
    const filter = defs
      .append('filter')
      .attr('id', 'glow')
      .attr('x', '-20px')
      .attr('y', '-20px')
      .attr('width', 'calc(max(100% + 40px, 60px))')
      .attr('height', 'calc(max(100% + 40px, 60px))')

    filter
      .append('feColorMatrix')
      .attr('type', 'matrix')
      .attr(
        'values',
        `
          3 1 0 0 0.3
          1 3 0 0 0.3
          0 0 1 0 0
          0 0 0 1 0
        `
      )
      .attr('result', 'brighter')

    filter
      .append('feGaussianBlur')
      .attr('in', 'brighter')
      .attr('stdDeviation', '2')
      .attr('result', 'blur1')

    filter
      .append('feGaussianBlur')
      .attr('in', 'SourceGraphic')
      .attr('stdDeviation', '10')
      .attr('result', 'blur2')

    const feMerge = filter.append('feMerge')
    feMerge.append('feMergeNode').attr('in', 'blur2')
    feMerge.append('feMergeNode').attr('in', 'blur1')
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic')

    const simulation = d3
      .forceSimulation<V>(data.vertex)
      .force(
        'link',
        d3.forceLink<V, Edge<V>>(data.edge).id((d) => d.id)
      )
      .force('charge', d3.forceManyBody().strength(-300))
      .force('x', d3.forceX(width / 2).strength(0.2))
      .force('y', d3.forceY(height / 2).strength(0.2))
      .force(
        'collision',
        d3
          .forceCollide<V>()
          .radius((d) => d.size * 2)
          .strength(0.5)
      )

    const edge = svg
      .append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll()
      .data(data.edge)
      .join('line')
      .attr('id', (d) => `edge-${d.id}`)
      .attr('stroke-width', 1.5)

    const vertex = svg
      .append('g')
      .selectAll()
      .data(data.vertex)
      .join('g')
      .call(
        drag(simulation, (d) => {
          setSelectedVertexId(d.id)
          onSelect?.(d)
        })
      )
      .attr('id', (d) => `vertex-${d.id}`)
      .attr('cursor', 'pointer')

    vertex
      .append('circle')
      .attr('r', (d) => d.size)
      .attr('fill', colord('#4f39f6').desaturate(0.6).toHex())
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .attr('x', (d) => d.x!)
      .attr('y', (d) => d.y!)

    vertex
      .append('text')
      .text((d) => d.name)
      .attr('fill', 'white')
      .attr('fill-opacity', 0.3)
      .attr('x', (d) => d.size + 5)
      .attr('y', (d) => d.size * 0.5)
      .attr('font-size', 12)
      .attr('font-weight', 400)

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

  return (
    <Box
      component="svg"
      ref={svgRef}
      width={1}
      height={1}
      onClick={(e) => {
        const target = e.target as SVGElement
        if (target !== e.currentTarget) {
          return
        }
        setSelectedVertexId(null)
        onSelect?.(null)
      }}
      sx={{ userSelect: 'none' }}
    />
  )
}

function drag<V extends Vertex>(simulation: d3.Simulation<V, Edge<V>>, onClick?: (d: V) => void) {
  function dragstarted(event: d3.D3DragEvent<SVGSVGElement, V, V>) {
    if (!event.active) simulation.alphaTarget(0.3).restart()
    event.subject.fx = event.subject.x
    event.subject.fy = event.subject.y
  }

  function dragged(event: d3.D3DragEvent<SVGSVGElement, V, V>) {
    event.subject.fx = event.x
    event.subject.fy = event.y
  }

  function dragended(event: d3.D3DragEvent<SVGSVGElement, V, V>) {
    if (!event.active) simulation.alphaTarget(0)
    event.subject.fx = null
    event.subject.fy = null
    onClick?.(event.subject)
  }

  return (selection: d3.Selection<SVGGElement | null, V, SVGElement, unknown>) => {
    ;(selection as d3.Selection<SVGGElement, V, SVGElement, unknown>).call(
      d3.drag<SVGGElement, V>().on('start', dragstarted).on('drag', dragged).on('end', dragended)
    )
  }
}
