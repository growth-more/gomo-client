import { useInterestGraph } from '@/api/hooks'
import { ForceDirectedGraph } from '@/components/force-directed-graph'
import { Widget } from '@/components/widget'
import { useModalStore } from '@/stores/use-modal-store'
import { CREATE_INTEREST_MODAL_ID, CreateInterestModal } from '@/views/interest/modals'

export function InterestGraphWidget1x1() {
  const { interestGraph } = useInterestGraph()
  const { addModal } = useModalStore()

  const createInterestHandler = () => {
    addModal(CREATE_INTEREST_MODAL_ID, <CreateInterestModal />)
  }

  return (
    <Widget
      width={1}
      title="내 관심사"
      subtitle={`${interestGraph.vertex.length}개의 관심사 관리 중`}
      onAdd={createInterestHandler}
    >
      <ForceDirectedGraph data={interestGraph} />
    </Widget>
  )
}
