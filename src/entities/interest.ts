import { Edge, Graph, Vertex } from '@/components/force-directed-graph/types'

interface InterestVertex extends Vertex {
  interest: Interest
}

interface InterestEdge extends Edge<InterestVertex> {
  source: string
  target: string
}

interface InterestGraph extends Graph<InterestVertex> {
  vertex: InterestVertex[]
  edge: InterestEdge[]
}

interface Interest {
  id: string
  name: string
  logoUrl: string
  colorCode: string | null
  level: number
  score: number
  scoreThreshold: number
  totalScore: number
}

interface MajorInterest {
  id: string
  interestId: string
  name: string
  logoUrl: string
  level: number
  score: number
  scoreThreshold: number
  displayOrder: number
}

export type { InterestGraph, InterestVertex, InterestEdge, Interest, MajorInterest }
