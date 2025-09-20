import { WidgetData } from '@/components/widget'
import { InterestGraphWidget1x1 } from '@/views/interest/widgets/interest-graph/interest-graph-widget-1x1'

const InterestGraphWidget = {
  id: 'INTEREST_GRAPH_WIDGET',
  name: '관심사 그래프',
  components: {
    S1x1: InterestGraphWidget1x1,
  } as const,
} satisfies WidgetData

export default InterestGraphWidget
