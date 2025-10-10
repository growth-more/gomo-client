import {
  WIDGET_COLUMN_SPACING,
  WIDGET_HEIGHT,
  WIDGET_ROW_SPACING,
  WIDGET_WIDTH,
} from '@/components/widget/constant'
import { widgetList } from '@/widgets'

export function calculateWidgetWidth(width: number) {
  return WIDGET_WIDTH * width + WIDGET_COLUMN_SPACING * (width - 1)
}

export function calculateWidgetHeight(height: number) {
  return WIDGET_HEIGHT * height + WIDGET_ROW_SPACING * (height - 1)
}

export function getWidget(id: string, width: number, height: number) {
  return widgetList.find((widget) => widget.id === id)?.render(width, height)
}
