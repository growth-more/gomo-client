import { Widget } from '@/components/widget'
import { WeeklyQuestWidget1x1 } from '@/views/quest/widgets/weekly-quest/weekly-quest-widget-1x1'
import { WeeklyQuestWidget1x1Preview } from '@/views/quest/widgets/weekly-quest/weekly-quest-widget-1x1-preivew'
import { WeeklyQuestWidget1x2 } from '@/views/quest/widgets/weekly-quest/weekly-quest-widget-1x2'
import { WeeklyQuestWidget1x2Preview } from '@/views/quest/widgets/weekly-quest/weekly-quest-widget-1x2-preivew'
import { WeeklyQuestWidget } from '@/widgets/weekly-quest/weekly-quest-widget'

export const weeklyQuestWidget: Widget = {
  id: 'WEEKLY_QUEST_WIDGET',
  name: '주간퀘스트',
  sizes: [
    {
      width: 1,
      height: 1,
      component: WeeklyQuestWidget1x1,
      preview: WeeklyQuestWidget1x1Preview,
    },
    {
      width: 2,
      height: 1,
      component: WeeklyQuestWidget1x2,
      preview: WeeklyQuestWidget1x2Preview,
    },
  ],
  render: (width: number, height: number) => <WeeklyQuestWidget width={width} height={height} />,
}
