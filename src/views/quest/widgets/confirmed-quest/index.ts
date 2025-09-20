import { WidgetData } from '@/components/widget'
import { ConfirmedQuestWidget1x1 } from '@/views/quest/widgets/confirmed-quest/confirmed-quest-widget-1x1'
import { ConfirmedQuestWidget1x2 } from '@/views/quest/widgets/confirmed-quest/confirmed-quest-widget-1x2'

export const ConfirmedQuestWidget = {
  id: 'CONFIRMED_QUEST_WIDGET',
  name: '진행중인 퀘스트',
  widgets: {
    S1x1: {
      width: 1,
      height: 1,
      component: ConfirmedQuestWidget1x1,
    },
    S1x2: {
      width: 2,
      height: 1,
      component: ConfirmedQuestWidget1x2,
    },
  } as const,
} satisfies WidgetData
