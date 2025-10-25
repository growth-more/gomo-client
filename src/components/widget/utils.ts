import {
  WIDGET_COLUMN_SPACING,
  WIDGET_HEIGHT,
  WIDGET_ROW_SPACING,
  WIDGET_WIDTH,
} from '@/components/widget/constant'
import { ManagerData, WidgetApiData } from '@/components/widget/widget.types'
import { widgetList } from '@/widgets'
import { v4 as uuidv4 } from 'uuid'

export function calculateWidgetWidth(width: number) {
  return WIDGET_WIDTH * width + WIDGET_COLUMN_SPACING * (width - 1)
}

export function calculateWidgetHeight(height: number) {
  return WIDGET_HEIGHT * height + WIDGET_ROW_SPACING * (height - 1)
}

export function getWidget(id: string, width: number, height: number) {
  return widgetList.find((widget) => widget.id === id)?.render(width, height)
}

export function getWidgetPreview(id: string, width: number, height: number) {
  return widgetList
    .find((widget) => widget.id === id)
    ?.sizes.find((size) => size.width === width && size.height === height)
    ?.preview()
}

export function createWidgetSnapshot(widgets: ManagerData[]): WidgetApiData[] {
  return widgets.map((widget) => ({
    id: widget.widgetId,
    width: widget.width,
    height: widget.height,
    row: widget.row,
    column: widget.column,
  }))
}

export function parseWidgetSnapshot(snapshot: WidgetApiData[]): ManagerData[] {
  return snapshot.map((widget) => ({
    id: uuidv4(),
    widgetId: widget.id,
    width: widget.width,
    height: widget.height,
    row: widget.row,
    column: widget.column,
  }))
}
