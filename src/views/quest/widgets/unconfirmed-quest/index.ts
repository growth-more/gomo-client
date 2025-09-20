import { WidgetData } from '@/components/widget'
import { UnconfirmedQuestWidget1x1 } from '@/views/quest/widgets/unconfirmed-quest/unconfirmed-quest-widget-1x1'
import { UnconfirmedQuestWidget1x2 } from '@/views/quest/widgets/unconfirmed-quest/unconfirmed-quest-widget-1x2'

export const UnconfirmedQuestWidget = {
  id: 'UNCONFIRMED_QUEST_WIDGET',
  name: '대기중인 퀘스트',
  widgets: {
    S1x1: {
      width: 1,
      height: 1,
      component: UnconfirmedQuestWidget1x1,
    },
    S1x2: {
      width: 2,
      height: 1,
      component: UnconfirmedQuestWidget1x2,
    },
  } as const,
} satisfies WidgetData
