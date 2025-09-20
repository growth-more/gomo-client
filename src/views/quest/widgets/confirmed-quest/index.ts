import { WidgetData } from '@/components/widget'
import { ConfirmedQuestWidget1x1 } from '@/views/quest/widgets/confirmed-quest/confirmed-quest-widget-1x1'
import { ConfirmedQuestWidget1x2 } from '@/views/quest/widgets/confirmed-quest/confirmed-quest-widget-1x2'

const ConfirmedQuestWidget = {
  id: 'CONFIRMED_QUEST_WIDGET',
  name: '진행중인 퀘스트',
  components: {
    S1x1: ConfirmedQuestWidget1x1,
    S1x2: ConfirmedQuestWidget1x2,
  } as const,
} satisfies WidgetData

export default ConfirmedQuestWidget
