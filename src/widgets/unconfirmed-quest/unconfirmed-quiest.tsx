import { WidgetComponentProps } from '@/components/widget'
import { UnconfirmedQuestWidget1x1 } from '@/widgets/unconfirmed-quest/unconfirmed-quest-widget-1x1'
import { UnconfirmedQuestWidget1x2 } from '@/widgets/unconfirmed-quest/unconfirmed-quest-widget-1x2'

export function UnconfirmedQuestWidget({ width, height }: WidgetComponentProps) {
  if (width === 1 && height === 1) {
    return <UnconfirmedQuestWidget1x1 />
  }
  if (width === 2 && height === 1) {
    return <UnconfirmedQuestWidget1x2 />
  }
  return null
}
