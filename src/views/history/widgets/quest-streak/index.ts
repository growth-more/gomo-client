import { WidgetData } from '@/components/widget'
import { QuestStreakWidget1x3 } from '@/views/history/widgets/quest-streak/quest-streak-widget-1x3'
import { QuestStreakWidget1x3Preview } from '@/views/history/widgets/quest-streak/quest-streak-widget-1x3-preview'

export const QuestStreakWidget = {
  id: 'QUEST_STREAK_WIDGET',
  name: '퀘스트 연속기록',
  widgets: {
    S1x3: {
      width: 3,
      height: 1,
      component: QuestStreakWidget1x3,
      preview: QuestStreakWidget1x3Preview,
    },
  } as const,
} satisfies WidgetData
