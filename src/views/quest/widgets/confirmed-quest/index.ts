import { WidgetData } from '@/components/widget'
import { ConfirmedQuestWidget1x1 } from '@/views/quest/widgets/confirmed-quest/confirmed-quest-widget-1x1'
import { ConfirmedQuestWidget1x1Preview } from '@/views/quest/widgets/confirmed-quest/confirmed-quest-widget-1x1-preview'
import { ConfirmedQuestWidget1x2 } from '@/views/quest/widgets/confirmed-quest/confirmed-quest-widget-1x2'
import { ConfirmedQuestWidget1x2Preview } from '@/views/quest/widgets/confirmed-quest/confirmed-quest-widget-1x2-preview'

export const ConfirmedQuestWidget = {
  id: 'CONFIRMED_QUEST_WIDGET',
  name: '진행중인 퀘스트',
  widgets: {
    S1x1: {
      width: 1,
      height: 1,
      component: ConfirmedQuestWidget1x1,
      preview: ConfirmedQuestWidget1x1Preview,
    },
    S1x2: {
      width: 2,
      height: 1,
      component: ConfirmedQuestWidget1x2,
      preview: ConfirmedQuestWidget1x2Preview,
    },
  } as const,
} satisfies WidgetData
