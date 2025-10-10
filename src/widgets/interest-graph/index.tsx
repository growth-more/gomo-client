import { Widget } from '@/components/widget'
import { InterestGraphWidget1x1 } from '@/views/interest/widgets/interest-graph/interest-graph-widget-1x1'
import { InterestGraphWidget1x1Preview } from '@/views/interest/widgets/interest-graph/interest-graph-widget-1x1-preview'

export const interestGraphWidget: Widget = {
  id: 'INTEREST_GRAPH_WIDGET',
  name: '관심사 그래프',
  sizes: [
    {
      width: 1,
      height: 1,
      component: InterestGraphWidget1x1,
      preview: InterestGraphWidget1x1Preview,
    },
  ],
  render: (width: number, height: number) => {
    if (width === 1 && height === 1) {
      return <InterestGraphWidget1x1 />
    }
    return null
  },
}
