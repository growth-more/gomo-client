import { WidgetData } from '@/components/widget'
import { MonthlyQuestWidget1x1 } from '@/views/quest/widgets/monthly-quest/monthly-quest-widget-1x1'
import { MonthlyQuestWidget1x2 } from '@/views/quest/widgets/monthly-quest/monthly-quest-widget-1x2'

export const MonthlyQuestWidget = {
  id: 'MONTHLY_QUEST_WIDGET',
  name: '월간퀘스트',
  widgets: {
    S1x1: {
      width: 1,
      height: 1,
      component: MonthlyQuestWidget1x1,
    },
    S1x2: {
      width: 2,
      height: 1,
      component: MonthlyQuestWidget1x2,
    },
  } as const,
} satisfies WidgetData
