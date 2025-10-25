import { useInterest } from '@/api/hooks'
import { ForceDirectedGraph } from '@/components/force-directed-graph'
import { WidgetBasic } from '@/components/widget'
import { useModalStore } from '@/stores/use-modal-store'
import { InterestEmpty } from '@/views/interest/components'
import {
  CREATE_INTEREST_MODAL_ID,
  CreateInterestModal,
  INTEREST_MODAL_ID,
  InterestModal,
} from '@/views/interest/modals'
import { Box } from '@mui/material'

export function InterestGraphWidget1x1() {
  const { interestGraph } = useInterest()
  const { addModal } = useModalStore()

  const createInterestHandler = () => {
    addModal(CREATE_INTEREST_MODAL_ID, <CreateInterestModal />)
  }

  const openInterestHandler = () => {
    addModal(INTEREST_MODAL_ID, <InterestModal initMenuId="INTEREST_GRAPH" />)
  }

  return (
    <WidgetBasic
      width={1}
      title="내 관심사"
      subtitle={`${interestGraph.vertex.length}개의 관심사 관리 중`}
      onAdd={createInterestHandler}
      onTitle={openInterestHandler}
    >
      {interestGraph.vertex.length === 0 ? (
        <Box p={1} height={1}>
          <InterestEmpty />
        </Box>
      ) : (
        <ForceDirectedGraph data={interestGraph} />
      )}
    </WidgetBasic>
  )
}
