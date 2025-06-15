import { Components, Theme } from '@mui/material'

const MuiMenu: Components<Theme>['MuiMenu'] = {
  styleOverrides: {
    paper: ({ theme }: { theme: Theme }) => ({
      boxShadow: 'none',
      border: `1px solid ${theme.palette.divider}`,
      marginTop: '5px',
    }),
  },
}

export const menu = { MuiMenu }
