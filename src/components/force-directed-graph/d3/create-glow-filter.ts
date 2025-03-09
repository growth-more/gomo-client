import { GLOW_FILTER } from '@/components/force-directed-graph/constants'

export function createGlowFilter(
  selection: d3.Selection<SVGDefsElement, unknown, null, undefined>
) {
  const filter = selection
    .append('filter')
    .attr('id', GLOW_FILTER.ID)
    .attr('x', GLOW_FILTER.X)
    .attr('y', GLOW_FILTER.Y)
    .attr('width', GLOW_FILTER.WIDTH)
    .attr('height', GLOW_FILTER.HEIGHT)

  // COLOR MATRIX
  filter
    .append('feColorMatrix')
    .attr('type', 'matrix')
    .attr('values', GLOW_FILTER.COLOR_MATRIX.VALUES)
    .attr('result', GLOW_FILTER.COLOR_MATRIX.RESULT)

  // INNER BLUR
  filter
    .append('feGaussianBlur')
    .attr('in', GLOW_FILTER.COLOR_MATRIX.RESULT)
    .attr('stdDeviation', GLOW_FILTER.INNER_BLUR.STD_DEVIATION)
    .attr('result', GLOW_FILTER.INNER_BLUR.RESULT)

  // OUTER BLUR
  filter
    .append('feGaussianBlur')
    .attr('in', 'SourceGraphic')
    .attr('stdDeviation', GLOW_FILTER.OUTER_BLUR.STD_DEVIATION)
    .attr('result', GLOW_FILTER.OUTER_BLUR.RESULT)

  // MERGE
  const merge = filter.append('feMerge')
  merge.append('feMergeNode').attr('in', GLOW_FILTER.OUTER_BLUR.RESULT)
  merge.append('feMergeNode').attr('in', GLOW_FILTER.INNER_BLUR.RESULT)
  merge.append('feMergeNode').attr('in', 'SourceGraphic')

  return filter
}
