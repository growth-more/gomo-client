import { Widget } from '@/components/widget'
import { DailyQuestWidget1x1 } from '@/views/quest/widgets/daily-quest/daily-quest-widget-1x1'
import { DailyQuestWidget1x1Preview } from '@/views/quest/widgets/daily-quest/daily-quest-widget-1x1-preview'
import { DailyQuestWidget1x2 } from '@/views/quest/widgets/daily-quest/daily-quest-widget-1x2'
import { DailyQuestWidget1x2Preview } from '@/views/quest/widgets/daily-quest/daily-quest-widget-1x2-preview'

export const dailyQuestWidget: Widget = {
  id: 'DAILY_QUEST_WIDGET',
  name: '일일퀘스트',
  sizes: [
    {
      width: 1,
      height: 1,
      component: DailyQuestWidget1x1,
      preview: DailyQuestWidget1x1Preview,
    },
    {
      width: 2,
      height: 1,
      component: DailyQuestWidget1x2,
      preview: DailyQuestWidget1x2Preview,
    },
  ],
  render: (width: number, height: number) => {
    if (width === 1 && height === 1) {
      return <DailyQuestWidget1x1 />
    }
    if (width === 2 && height === 1) {
      return <DailyQuestWidget1x2 />
    }
    return null
  },
}
