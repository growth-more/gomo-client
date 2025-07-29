import { SIMULATION } from '@/components/force-directed-graph/constants'
import { Edge, Graph, Vertex } from '@/components/force-directed-graph/types'
import * as d3 from 'd3'

export function createSimulation<V extends Vertex>(data: Graph<V>, width: number, height: number) {
  const simulation = d3
    .forceSimulation<V>(data.vertex)
    .force(
      'link',
      d3
        .forceLink<V, Edge<V>>(data.edge)
        .id((d) => d.id)
        .distance(SIMULATION.LINK_DISTANCE)
    )
    .force('charge', d3.forceManyBody().strength(SIMULATION.CHARGE_STRENGTH))
    .force('x', d3.forceX(width / 2).strength(SIMULATION.FORCE_X_STRENGTH))
    .force('y', d3.forceY(height / 2).strength(SIMULATION.FORCE_Y_STRENGTH))
    .force(
      'collision',
      d3
        .forceCollide<V>()
        .radius((d) => d.size * SIMULATION.COLLISION_RADIUS)
        .strength(SIMULATION.COLLISION_STRENGTH)
    )

  return simulation
}
