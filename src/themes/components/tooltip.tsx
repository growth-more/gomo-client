import { Components, Theme } from '@mui/material'

const MuiTooltip: Components<Theme>['MuiTooltip'] = {
  defaultProps: {
    arrow: true,
    placement: 'top',
    disableInteractive: true,
  },
}

export const tooltip = { MuiTooltip }
