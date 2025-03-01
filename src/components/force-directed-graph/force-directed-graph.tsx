import { useWindowViewContext } from '@/components/window'
import { Box } from '@mui/material'
import * as d3 from 'd3'
import { useEffect, useRef } from 'react'
import { Graph, Vertex, Edge } from './types'

interface ForceDirectedGraphProps<V extends Vertex> {
  data: Graph<V>
  onSelect?: (interest: V | null) => void
}

export function ForceDirectedGraph<V extends Vertex>({
  data,
  onSelect,
}: ForceDirectedGraphProps<V>) {
  const { viewSize } = useWindowViewContext()

  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) {
      return
    }

    const width = svgRef.current.clientWidth
    const height = svgRef.current.clientHeight

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

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
      .attr('stroke-width', 1.5)

    const vertex = svg
      .append('g')
      .selectAll()
      .data(data.vertex)
      .join('g')
      .call(drag(simulation))
      .on('click', (e, d) => onSelect?.(d))

    vertex
      .append('circle')
      .attr('r', (d) => d.size)
      .attr('fill', 'oklch(0.511 0.262 276.966)')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .attr('x', (d) => d.x!)
      .attr('y', (d) => d.y!)

    vertex
      .append('text')
      .text((d) => d.name)
      .attr('fill', 'white')
      .attr('x', (d) => d.size + 5)
      .attr('y', (d) => d.size * 0.5)
      .attr('font-size', 12)

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

  return <Box component="svg" ref={svgRef} width={1} height={1} />
}

function drag<V extends Vertex>(simulation: d3.Simulation<V, Edge<V>>) {
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
  }

  return (selection: d3.Selection<SVGGElement | null, V, SVGElement, unknown>) => {
    ;(selection as d3.Selection<SVGGElement, V, SVGElement, unknown>).call(
      d3.drag<SVGGElement, V>().on('start', dragstarted).on('drag', dragged).on('end', dragended)
    )
  }
}
