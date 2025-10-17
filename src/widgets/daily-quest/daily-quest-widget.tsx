import { WidgetComponentProps } from '@/components/widget'
import { DailyQuestWidget1x1 } from '@/widgets/daily-quest/daily-quest-widget-1x1'
import { DailyQuestWidget1x2 } from '@/widgets/daily-quest/daily-quest-widget-1x2'

export function DailyQuestWidget({ width, height }: WidgetComponentProps) {
  if (width === 1 && height === 1) {
    return <DailyQuestWidget1x1 />
  }
  if (width === 2 && height === 1) {
    return <DailyQuestWidget1x2 />
  }
  return null
}
