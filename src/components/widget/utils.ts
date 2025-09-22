import {
  WIDGET_COLUMN_SPACING,
  WIDGET_HEIGHT,
  WIDGET_ROW_SPACING,
  WIDGET_WIDTH,
} from '@/components/widget/constant'

export const calculateWidgetWidth = (width: number) => {
  return WIDGET_WIDTH * width + WIDGET_COLUMN_SPACING * (width - 1)
}

export const calculateWidgetHeight = (height: number) => {
  return WIDGET_HEIGHT * height + WIDGET_ROW_SPACING * (height - 1)
}
