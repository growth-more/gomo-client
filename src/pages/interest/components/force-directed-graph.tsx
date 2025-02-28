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
  const svgRef = useRef<SVGSVGElement>(null)

  //   // 차트 크기 지정
  //   const width = 928
  //   const height = 600

  //   /*
  //     color 지정
  //     d3.scaleOrdianl : 입력값과 출력값을 1:1로 매핑해주는 함수
  //     d3.schemeCategory10 : d3에서 제공하는 기본 10가지 색상 팔레트
  //   */
  //   const color = d3.scaleOrdinal(d3.schemeCategory10)

  //   // 실제 시뮬레이팅을 위한 복사본 생성
  //   const links = data.links.map((d) => ({ ...d }))
  //   const nodes = data.nodes.map((d) => ({ ...d }))

  //   /*
  //     시뮬레이션 생성
  //     link : 노드 간 일정 거리를 유지하도록 하는 힘
  //     charge : 노드 간의 밀고 당기는 힘
  //     center : 모든 노드를 중심으로 당기는 힘

  //     d3.forceLink(links) : links 배열을 기반으로 연결 관계 설정
  //     d3.forceManyBody() : 기본적으로 노드들이 서로 밀어내도록 함
  //   */
  //   const simulation = d3
  //     .forceSimulation<Vertex>(nodes)
  //     .force(
  //       'link',
  //       d3.forceLink<Vertex, Edge>(links).id((d) => d.id)
  //     )
  //     .force('charge', d3.forceManyBody())
  //     .force('center', d3.forceCenter(width / 2, height / 2))
  //     .on('tick', ticked)

  //   /*
  //     SVG 컨테이너 생성
  //     d3.select('svg') : SVG 요소 선택
  //     d3.select('body') : 문서의 body 요소 선택
  //     append('svg') : SVG 요소 추가
  //   */
  //   const svg = d3
  //     .create('svg')
  //     .attr('width', width)
  //     .attr('height', height)
  //     .attr('viewBox', [0, 0, width, height])
  //     .attr('style', 'max-width: 100%; height: auto;')

  //   /*
  //     Vertex 그리기
  //    */
  //   const node = svg
  //     .append('g')
  //     .attr('stroke', '#fff')
  //     .attr('storke-width', 1.5)
  //     .selectAll()
  //     .data(nodes)
  //     .join('circle')
  //     .attr('r', 5)
  //     .attr('fill', () => color(random(0, 10).toString()))

  //   node.append('title').text((d) => d.id)

  //   /*
  //     Edge 그리기
  //   */
  //   const link = svg
  //     .append('g')
  //     .attr('stroke', '#999')
  //     .attr('stroke-opacity', 0.6)
  //     .selectAll()
  //     .data(links)
  //     .join('line')
  //     .attr('stroke-width', 1.5)

  //   function ticked() {
  //     link
  //       .attr('x1', (d) => (d.source as Vertex).x!)
  //       .attr('y1', (d) => (d.source as Vertex).y!)
  //       .attr('x2', (d) => (d.target as Vertex).x!)
  //       .attr('y2', (d) => (d.target as Vertex).y!)

  //     node.attr('cx', (d) => d.x!).attr('cy', (d) => d.y!)
  //   }

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
      //   .force('center', d3.forceCenter(width / 2, height / 2))
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
      .attr('x', (d) => d.size + 10)
      .attr('y', (d) => d.size * 0.5)
      .attr('font-size', 12)

    simulation.on('tick', () => {
      link
        .attr('x1', (d) => (d.source as Vertex).x!)
        .attr('y1', (d) => (d.source as Vertex).y!)
        .attr('x2', (d) => (d.target as Vertex).x!)
        .attr('y2', (d) => (d.target as Vertex).y!)

      //   node.attr('cx', (d) => d.x!).attr('cy', (d) => d.y!)
      node.attr('transform', (d) => `translate(${d.x},${d.y})`)
    })
  }, [])

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
    console.log(event.subject)
  }

  function dragged(event: d3.D3DragEvent<SVGSVGElement, Vertex, Vertex>) {
    event.subject.fx = event.x
    event.subject.fy = event.y
  }

  function dragended(event: d3.D3DragEvent<SVGSVGElement, Vertex, Vertex>) {
    if (!event.active) simulation.alphaTarget(0)
    event.subject.fx = null
    event.subject.fy = null
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

  //   return d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended)
}
