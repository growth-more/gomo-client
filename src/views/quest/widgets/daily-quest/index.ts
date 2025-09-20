import { WidgetData } from '@/components/widget'
import { DailyQuestWidget1x1 } from '@/views/quest/widgets/daily-quest/daily-quest-widget-1x1'
import { DailyQuestWidget1x2 } from '@/views/quest/widgets/daily-quest/daily-quest-widget-1x2'

const DailyQuestWidget = {
  id: 'DAILY_QUEST_WIDGET',
  name: '일일퀘스트',
  components: {
    S1x1: DailyQuestWidget1x1,
    S1x2: DailyQuestWidget1x2,
  } as const,
} satisfies WidgetData

export default DailyQuestWidget
