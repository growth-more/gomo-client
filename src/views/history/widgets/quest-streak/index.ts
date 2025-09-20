import { WidgetData } from '@/components/widget'
import { QuestStreakWidget1x3 } from '@/views/history/widgets/quest-streak/quest-streak-widget-1x3'

const QuestStreakWidget = {
  id: 'QUEST_STREAK_WIDGET',
  name: '퀘스트 연속기록',
  components: {
    S1x3: QuestStreakWidget1x3,
  } as const,
} satisfies WidgetData

export default QuestStreakWidget
