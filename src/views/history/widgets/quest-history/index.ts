import { WidgetData } from '@/components/widget'
import { QuestHistoryWidget1x1 } from '@/views/history/widgets/quest-history/quest-history-widget-1x1'

const QuestHistoryWidget = {
  id: 'QUEST_HISTORY_WIDGET',
  name: '퀘스트 기록',
  components: {
    S1x1: QuestHistoryWidget1x1,
  } as const,
} satisfies WidgetData

export default QuestHistoryWidget
