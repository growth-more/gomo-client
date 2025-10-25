import { InterestGraphWidget1x1 } from '@/widgets/interest-graph/interest-graph-widget-1x1'
import { WidgetComponentProps } from '@/components/widget'

export function InterestGraphWidget({ width, height }: WidgetComponentProps) {
  if (width === 1 && height === 1) {
    return <InterestGraphWidget1x1 />
  }
  return null
}
