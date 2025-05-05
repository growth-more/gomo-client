import { useInterestGraph } from '@/api/hooks'
import { ForceDirectedGraph } from '@/components/force-directed-graph'
import { Widget } from '@/components/widget'
import { useModalStore } from '@/stores/use-modal-store'
import {
  CREATE_INTEREST_MODAL_ID,
  CreateInterestModal,
  INTEREST_MODAL_ID,
  InterestModal,
} from '@/views/interest/modals'

export function InterestGraphWidget1x1() {
  const { interestGraph } = useInterestGraph()
  const { addModal } = useModalStore()

  const createInterestHandler = () => {
    addModal(CREATE_INTEREST_MODAL_ID, <CreateInterestModal />)
  }

  const openInterestHandler = () => {
    addModal(INTEREST_MODAL_ID, <InterestModal initMenuId="INTEREST_GRAPH" />)
  }

  return (
    <Widget
      width={1}
      title="내 관심사"
      subtitle={`${interestGraph.vertex.length}개의 관심사 관리 중`}
      onAdd={createInterestHandler}
      onTitle={openInterestHandler}
    >
      <ForceDirectedGraph data={interestGraph} />
    </Widget>
  )
}
