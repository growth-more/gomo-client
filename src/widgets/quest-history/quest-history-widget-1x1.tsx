import { useGetDailyTotalHistory } from '@/api/hooks'
import { WidgetBasic } from '@/components/widget'
import { useModalStore } from '@/stores/use-modal-store'
import { DailyTotalHistoryItem, HistoryWidgetEmpty } from '@/views/history/components'
import { HISTORY_MODAL_ID, HistoryModal } from '@/views/history/modals'
import { Stack } from '@mui/material'
import dayjs from 'dayjs'
import _ from 'lodash'

export function QuestHistoryWidget1x1() {
  const now = new Date()
  const [year, month] = [now.getFullYear(), now.getMonth() + 1]

  const { dailyTotalHistory } = useGetDailyTotalHistory(year, month)
  const { addModal } = useModalStore()

  const openHistoryModal = () => {
    addModal(HISTORY_MODAL_ID, <HistoryModal />)
  }

  return (
    <WidgetBasic
      width={1}
      height={1}
      title="퀘스트 기록"
      subtitle={dayjs(now).format('YYYY년 MM월 DD일')}
      onTitle={openHistoryModal}
    >
      <Stack p={1} height={1}>
        {dailyTotalHistory.length === 0 && <HistoryWidgetEmpty />}
        {_(dailyTotalHistory)
          .take(4)
          .map((data, i) => <DailyTotalHistoryItem key={i} {...data} />)
          .value()}
      </Stack>
    </WidgetBasic>
  )
}
