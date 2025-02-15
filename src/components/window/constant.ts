import { ResizeEnable } from 'react-rnd'

export const DEFAULT_MANAGER_SELECTOR = '#window-manager'

export const DEFAULT_MIN_WIDTH = 150
export const DEFAULT_MIN_HEIGHT = 100

export const MANAGER_PADDING = 10

export const DEFAULT_VIEW_SIZE = {
  width: DEFAULT_MIN_WIDTH,
  height: DEFAULT_MIN_HEIGHT,
}

export const DEFAULT_VIEW_POSITION = {
  x: MANAGER_PADDING,
  y: MANAGER_PADDING,
}

export const DISABLE_RESIZE: ResizeEnable = {
  top: false,
  right: false,
  bottom: false,
  left: false,
  topRight: false,
  bottomRight: false,
  bottomLeft: false,
  topLeft: false,
}
