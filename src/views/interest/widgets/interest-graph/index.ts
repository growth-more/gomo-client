import { WidgetData } from '@/components/widget'
import { InterestGraphWidget1x1 } from '@/views/interest/widgets/interest-graph/interest-graph-widget-1x1'

export const InterestGraphWidget = {
  id: 'INTEREST_GRAPH_WIDGET',
  name: '관심사 그래프',
  widgets: {
    S1x1: {
      width: 1,
      height: 1,
      component: InterestGraphWidget1x1,
    },
  } as const,
} satisfies WidgetData
