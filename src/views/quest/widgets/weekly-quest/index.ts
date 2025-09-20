import { WidgetData } from '@/components/widget'
import { WeeklyQuestWidget1x1 } from '@/views/quest/widgets/weekly-quest/weekly-quest-widget-1x1'
import { WeeklyQuestWidget1x2 } from '@/views/quest/widgets/weekly-quest/weekly-quest-widget-1x2'

export const WeeklyQuestWidget = {
  id: 'WEEKLY_QUEST_WIDGET',
  name: '주간퀘스트',
  widgets: {
    S1x1: {
      width: 1,
      height: 1,
      component: WeeklyQuestWidget1x1,
    },
    S1x2: {
      width: 2,
      height: 1,
      component: WeeklyQuestWidget1x2,
    },
  } as const,
} satisfies WidgetData
