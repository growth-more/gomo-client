import { WidgetComponentProps } from '@/components/widget'
import { QuestHistoryWidget1x1 } from '@/widgets/quest-history/quest-history-widget-1x1'

export function QuestHistoryWidget({ width, height }: WidgetComponentProps) {
  if (width === 1 && height === 1) {
    return <QuestHistoryWidget1x1 />
  }
  return null
}
