import { WidgetComponentProps } from '@/components/widget'
import { QuestStreakWidget1x3 } from '@/widgets/quest-streak/quest-streak-widget-1x3'

export function QuestStreakWidget({ width, height }: WidgetComponentProps) {
  if (width === 3 && height === 1) {
    return <QuestStreakWidget1x3 />
  }
  return null
}
