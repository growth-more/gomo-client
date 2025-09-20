import { WidgetData } from '@/components/widget'
import { DailyQuestWidget1x1 } from '@/views/quest/widgets/daily-quest/daily-quest-widget-1x1'
import { DailyQuestWidget1x2 } from '@/views/quest/widgets/daily-quest/daily-quest-widget-1x2'

export const DailyQuestWidget = {
  id: 'DAILY_QUEST_WIDGET',
  name: '일일퀘스트',
  widgets: {
    S1x1: {
      width: 1,
      height: 1,
      component: DailyQuestWidget1x1,
    },
    S1x2: {
      width: 2,
      height: 1,
      component: DailyQuestWidget1x2,
    },
  } as const,
} satisfies WidgetData
