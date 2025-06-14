import { useStreak } from '@/api/hooks'
import { CalendarHeatmap } from '@/components/heatmap'
import { Widget } from '@/components/widget'
import { useModalStore } from '@/stores/use-modal-store'
import { HISTORY_MODAL_ID, HistoryModal } from '@/views/history/modals'
import { Stack } from '@mui/material'
import dayjs from 'dayjs'

export function QuestStreakWidget1x3() {
  const endDate = dayjs().endOf('day').toDate()
  const startDate = dayjs(endDate).subtract(1, 'year').startOf('day').toDate()

  const { addModal } = useModalStore()

  const openHistoryModal = () => {
    addModal(HISTORY_MODAL_ID, <HistoryModal initMenuId="HISTORY_STREAK" />)
  }

  const { streak } = useStreak(startDate, endDate)

  return (
    <Widget
      width={3}
      title="퀘스트 연속 기록"
      subtitle="XXX일 연속 퀘스트 진행중"
      onTitle={openHistoryModal}
    >
      <Stack width={1} height={1} justifyContent="center" alignItems="center">
        <CalendarHeatmap data={streak.daily} endDate={endDate} type="DAILY" cellSize={17} />
      </Stack>
    </Widget>
  )
}
