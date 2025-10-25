import { Widget } from '@/components/widget'

import { MonthlyQuestWidget } from '@/widgets/monthly-quest/monthly-quest-widget'
import { MonthlyQuestWidget1x1 } from '@/widgets/monthly-quest/monthly-quest-widget-1x1'
import { MonthlyQuestWidget1x1Preview } from '@/widgets/monthly-quest/monthly-quest-widget-1x1-preview'
import { MonthlyQuestWidget1x2 } from '@/widgets/monthly-quest/monthly-quest-widget-1x2'
import { MonthlyQuestWidget1x2Preview } from '@/widgets/monthly-quest/monthly-quest-widget-1x2-preview'

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
