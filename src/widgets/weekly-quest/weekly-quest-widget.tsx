import { WeeklyQuestWidget1x1 } from '@/widgets/weekly-quest/weekly-quest-widget-1x1'
import { WeeklyQuestWidget1x2 } from '@/widgets/weekly-quest/weekly-quest-widget-1x2'
import { WidgetComponentProps } from '@/components/widget'

export function WeeklyQuestWidget({ width, height }: WidgetComponentProps) {
  if (width === 1 && height === 1) {
    return <WeeklyQuestWidget1x1 />
  }
  if (width === 2 && height === 1) {
    return <WeeklyQuestWidget1x2 />
  }
  return null
}
