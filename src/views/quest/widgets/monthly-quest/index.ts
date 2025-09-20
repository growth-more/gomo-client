import { WidgetData } from '@/components/widget'
import { MonthlyQuestWidget1x1 } from '@/views/quest/widgets/monthly-quest/monthly-quest-widget-1x1'
import { MonthlyQuestWidget1x2 } from '@/views/quest/widgets/monthly-quest/monthly-quest-widget-1x2'

const MonthlyQuestWidget = {
  id: 'MONTHLY_QUEST_WIDGET',
  name: '월간퀘스트',
  components: {
    S1x1: MonthlyQuestWidget1x1,
    S1x2: MonthlyQuestWidget1x2,
  } as const,
} satisfies WidgetData

export default MonthlyQuestWidget
