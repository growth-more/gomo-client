interface Vertex extends d3.SimulationNodeDatum {
  id: string
  name: string
  size: number
}

interface Edge<V extends Vertex> extends d3.SimulationLinkDatum<V> {
  source: string | V
  target: string | V
}

interface Graph<V extends Vertex> {
  vertex: V[]
  edge: Edge<V>[]
}

export type { Vertex, Edge, Graph }
