import { WidgetData } from '@/components/widget'
import { QuestHistoryWidget1x1 } from '@/views/history/widgets/quest-history/quest-history-widget-1x1'
import { QuestHistoryWidget1x1Preview } from '@/views/history/widgets/quest-history/quest-history-widget-1x1-preview'

export const QuestHistoryWidget = {
  id: 'QUEST_HISTORY_WIDGET',
  name: '퀘스트 기록',
  widgets: {
    S1x1: {
      width: 1,
      height: 1,
      component: QuestHistoryWidget1x1,
      preview: QuestHistoryWidget1x1Preview,
    },
  } as const,
} satisfies WidgetData
