import { Widget } from '@/components/widget'
import { MonthlyQuestWidget1x1 } from '@/views/quest/widgets/monthly-quest/monthly-quest-widget-1x1'
import { MonthlyQuestWidget1x1Preview } from '@/views/quest/widgets/monthly-quest/monthly-quest-widget-1x1-preview'
import { MonthlyQuestWidget1x2 } from '@/views/quest/widgets/monthly-quest/monthly-quest-widget-1x2'
import { MonthlyQuestWidget1x2Preview } from '@/views/quest/widgets/monthly-quest/monthly-quest-widget-1x2-preview'
import { MonthlyQuestWidget } from '@/widgets/monthly-quest/monthly-quest-widget'

export const monthlyQuestWidget: Widget = {
  id: 'MONTHLY_QUEST_WIDGET',
  name: '월간퀘스트',
  sizes: [
    {
      width: 1,
      height: 1,
      component: MonthlyQuestWidget1x1,
      preview: MonthlyQuestWidget1x1Preview,
    },
    {
      width: 2,
      height: 1,
      component: MonthlyQuestWidget1x2,
      preview: MonthlyQuestWidget1x2Preview,
    },
  ],
  render: (width: number, height: number) => <MonthlyQuestWidget width={width} height={height} />,
}
