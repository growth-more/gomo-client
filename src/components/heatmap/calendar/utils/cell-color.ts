import { darken, lighten } from '@mui/material'

const DEFAULT_THREASHOLDS = [1, 2, 3, 4]
const INITIAL_LIGHTNESS = 0.2
const DARKEN_STEP = 0.1

export function getCellColor(
  count: number,
  thresholds = DEFAULT_THREASHOLDS,
  color: string,
  emptyColor: string
) {
  const baseColor = color
  const lightColor = lighten(baseColor, INITIAL_LIGHTNESS)

  const thresholdIdx = thresholds.findIndex((threshold, i) => {
    const currValid = count >= threshold
    const nextValid = i === thresholds.length - 1 || count < thresholds[i + 1]
    return currValid && nextValid
  })
  if (thresholdIdx > -1) {
    return darken(lightColor, thresholdIdx * DARKEN_STEP)
  }
  return emptyColor
}
