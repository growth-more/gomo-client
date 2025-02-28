import { useWindowViewContext } from '@/components/window'
import { Box } from '@mui/material'
import * as d3 from 'd3'
import { useEffect, useRef } from 'react'

interface Vertex extends d3.SimulationNodeDatum {
  id: string
  name: string
  size: number
}

interface Edge extends d3.SimulationLinkDatum<Vertex> {
  source: string | Vertex
  target: string | Vertex
}

const data: {
  nodes: Vertex[]
  links: Edge[]
} = {
  nodes: [
    {
      id: '1',
      name: 'Node 1',
      size: 10,
    },
    {
      id: '2',
      name: 'Node 2',
      size: 10,
    },
    {
      id: '3',
      name: 'Node 3',
      size: 20,
    },
    {
      id: '4',
      name: 'Node 4',
      size: 20,
    },
    {
      id: '5',
      name: 'Node 5',
      size: 15,
    },
    {
      id: '6',
      name: 'Node 6',
      size: 15,
    },
    {
      id: '7',
      name: 'Node 7',
      size: 7,
    },
    {
      id: '8',
      name: 'Node 8',
      size: 7,
    },
    {
      id: '9',
      name: 'Node 9',
      size: 5,
    },
  ],
  links: [
    {
      source: '1',
      target: '2',
    },
    {
      source: '1',
      target: '3',
    },
    {
      source: '2',
      target: '4',
    },
    {
      source: '2',
      target: '5',
    },
    {
      source: '3',
      target: '6',
    },
    {
      source: '4',
      target: '7',
    },
    {
      source: '5',
      target: '8',
    },
    {
      source: '6',
      target: '9',
    },
    {
      source: '7',
      target: '9',
    },
    {
      source: '8',
      target: '9',
    },
  ],
}

export function ForceDirectedGraph() {
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
      .forceSimulation<Vertex>(data.nodes)
      .force(
        'link',
        d3.forceLink<Vertex, Edge>(data.links).id((d) => d.id)
      )
      .force('charge', d3.forceManyBody().strength(-300))
      .force('x', d3.forceX(width / 2).strength(0.2))
      .force('y', d3.forceY(height / 2).strength(0.2))
      .force(
        'collision',
        d3
          .forceCollide<Vertex>()
          .radius((d) => d.size * 2)
          .strength(0.5)
      )

    const link = svg
      .append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll()
      .data(data.links)
      .join('line')
      .attr('stroke-width', 1.5)

    const node = svg.append('g').selectAll().data(data.nodes).join('g').call(drag(simulation))

    node
      .append('circle')
      .attr('r', (d) => d.size * 0.8)
      .attr('fill', 'oklch(0.511 0.262 276.966)')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .attr('x', (d) => d.x!)
      .attr('y', (d) => d.y!)

    node
      .append('text')
      .text((d) => d.name)
      .attr('fill', 'white')
      .attr('x', (d) => d.size + 5)
      .attr('y', (d) => d.size * 0.5)
      .attr('font-size', 12)

    simulation.on('tick', () => {
      link
        .attr('x1', (d) => (d.source as Vertex).x!)
        .attr('y1', (d) => (d.source as Vertex).y!)
        .attr('x2', (d) => (d.target as Vertex).x!)
        .attr('y2', (d) => (d.target as Vertex).y!)

      node.attr('transform', (d) => `translate(${d.x},${d.y})`)
    })
  }, [viewSize])

  return (
    <Box width={1} height={1} p={2}>
      <Box component="svg" ref={svgRef} width={1} height={1} />
    </Box>
  )
}

function drag(simulation: d3.Simulation<Vertex, Edge>) {
  function dragstarted(event: d3.D3DragEvent<SVGSVGElement, Vertex, Vertex>) {
    if (!event.active) simulation.alphaTarget(0.3).restart()
    event.subject.fx = event.subject.x
    event.subject.fy = event.subject.y
  }

  function dragged(event: d3.D3DragEvent<SVGSVGElement, Vertex, Vertex>) {
    event.subject.fx = event.x
    event.subject.fy = event.y
  }

  function dragended(event: d3.D3DragEvent<SVGSVGElement, Vertex, Vertex>) {
    if (!event.active) simulation.alphaTarget(0)
    event.subject.fx = null
    event.subject.fy = null
    console.log(event.subject)
  }

  return (selection: d3.Selection<SVGGElement | null, Vertex, SVGElement, unknown>) => {
    ;(selection as d3.Selection<SVGGElement, Vertex, SVGElement, unknown>).call(
      d3
        .drag<SVGGElement, Vertex>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
    )
  }
}
