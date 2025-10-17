import { WidgetComponentProps } from '@/components/widget'
import { MonthlyQuestWidget1x2 } from '@/widgets/monthly-quest/monthly-quest-widget-1x2'
import { MonthlyQuestWidget1x1 } from '@/widgets/monthly-quest/monthly-quest-widget-1x1'

export function MonthlyQuestWidget({ width, height }: WidgetComponentProps) {
  if (width === 1 && height === 1) {
    return <MonthlyQuestWidget1x1 />
  }
  if (width === 2 && height === 1) {
    return <MonthlyQuestWidget1x2 />
  }
  return null
}
