import { Edge, Vertex } from '@/components/force-directed-graph/types'
import * as d3 from 'd3'

export function drag<V extends Vertex>(
  simulation: d3.Simulation<V, Edge<V>>,
  onClick?: (d: V) => void
) {
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
