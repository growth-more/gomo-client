import { WidgetComponentProps } from '@/components/widget'
import { ConfirmedQuestWidget1x1 } from '@/views/quest/widgets/confirmed-quest/confirmed-quest-widget-1x1'
import { ConfirmedQuestWidget1x2 } from '@/views/quest/widgets/confirmed-quest/confirmed-quest-widget-1x2'

export function ConfirmedQuestWidget({ width, height }: WidgetComponentProps) {
  if (width === 1 && height === 1) {
    return <ConfirmedQuestWidget1x1 />
  }
  if (width === 2 && height === 1) {
    return <ConfirmedQuestWidget1x2 />
  }
  return null
}
