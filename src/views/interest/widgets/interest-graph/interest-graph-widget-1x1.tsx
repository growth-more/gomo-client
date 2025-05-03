import { useInterestGraph } from '@/api/hooks'
import { ForceDirectedGraph } from '@/components/force-directed-graph'
import { Widget } from '@/components/widget'

export function InterestGraphWidget1x1() {
  const { interestGraph } = useInterestGraph()

  return (
    <Widget
      width={1}
      title="내 관심사"
      subtitle={`${interestGraph.vertex.length}개의 관심사 관리 중`}
    >
      <ForceDirectedGraph data={interestGraph} />
    </Widget>
  )
}
