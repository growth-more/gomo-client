export const VERTEX = {
  ID_PREFIX: 'vertex-',

  FILL_COLOR: '#615FFF',
  FILL_DESATURATION: 0.3,
  FILL_OPACITY: 0.3,

  STROKE_COLOR: '#71717a',
  STROKE_WIDTH: 1.5,

  TEXT_COLOR: '#3f3f46',
  TEXT_OPACITY: 0.8,
  TEXT_SIZE: 12,
  TEXT_WEIGHT: 400,
  TEXT_X_OFFSET: 5,
  TEXT_Y_OFFSET: 0.5,

  SELECTED: {
    TEXT_OPACITY: 1,
    TEXT_WEIGHT: 600,
  },
}

export const EDGE = {
  ID_PREFIX: 'edge-',

  STROKE_COLOR: '#71717a',
  STROKE_WIDTH: 1.5,
  STROKE_OPACITY: 0.8,

  SELECTED: {
    TARGET_STROKE_COLOR: '#615FFF',
    SOURCE_STROKE_COLOR: '#615FFF',

    STROKE_OPACITY: 1,
    STROKE_WIDTH: 3,
  },
}

export const GLOW_FILTER = {
  ID: 'GLOW',

  X: '-20px',
  Y: '-20px',
  WIDTH: 'calc(max(100% + 40px, 60px))',
  HEIGHT: 'calc(max(100% + 40px, 60px))',

  COLOR_MATRIX: {
    VALUES: `
        3 1 0 0 0.3
        1 3 0 0 0.3
        0 0 1 0 0
        0 0 0 1 0
    `,
    RESULT: 'BRIGHTER',
  },

  INNER_BLUR: {
    STD_DEVIATION: 2,
    RESULT: 'INNER_BLUR',
  },

  OUTER_BLUR: {
    STD_DEVIATION: 10,
    RESULT: 'OUTER_BLUR',
  },
}

export const SIMULATION = {
  CHARGE_STRENGTH: -300,
  FORCE_X_STRENGTH: 0.2,
  FORCE_Y_STRENGTH: 0.2,
  COLLISION_RADIUS: 2,
  COLLISION_STRENGTH: 0.5,
}
