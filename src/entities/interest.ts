import { Edge, Graph, Vertex } from '@/components/force-directed-graph/types'

interface InterestVertex extends Vertex {
  id: string
  name: string
  size: number
}

interface InterestEdge extends Edge<InterestVertex> {
  source: string
  target: string
}

interface InterestGraph extends Graph<InterestVertex> {
  vertex: InterestVertex[]
  edge: InterestEdge[]
}

export type { InterestGraph, InterestVertex, InterestEdge }
