import type { Theme, Components } from '@mui/material'

const MuiButtonBase: Components<Theme>['MuiButtonBase'] = {
  styleOverrides: { root: ({ theme }) => ({ fontFamily: theme.typography.fontFamily }) },
}

const MuiButton: Components<Theme>['MuiButton'] = {
  defaultProps: {
    variant: 'contained',
  },
  styleOverrides: {
    root: () => ({
      boxShadow: 'none',
      '&:hover': {
        boxShadow: 'none',
      },
    }),
    contained: ({ theme, ownerState }) => {
      const styled = {
        inheritColor: {
          ...(ownerState.color === 'secondary' &&
            !ownerState.disabled &&
            (theme.palette.mode === 'light'
              ? {
                  color: theme.palette.common.white,
                  backgroundColor: theme.palette.grey[800],
                  '&:hover': { backgroundColor: theme.palette.grey[700] },
                }
              : {
                  color: theme.palette.grey[800],
                  backgroundColor: theme.palette.common.white,
                  '&:hover': { backgroundColor: theme.palette.grey[400] },
                })),
        },
      }
      return { ...styled.inheritColor }
    },
  },
  variants: [
    {
      props: { variant: 'plainText' },
      style: ({ theme }) => ({
        width: 'unset',
        minWidth: 'unset',
        display: 'inline',
        padding: 0,
        color: theme.palette.text.secondary,
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: 'transparent',
          textDecoration: 'underline',
          color: theme.palette.primary.main,
        },
      }),
    },
    {
      props: { variant: 'plain' },
      style: ({ theme }) => ({
        color: theme.palette.text.secondary,
        backgroundColor: theme.palette.grey[200],
        '&:hover': {
          backgroundColor: theme.palette.grey[300],
        },
      }),
    },
  ],
}

export const button = { MuiButtonBase, MuiButton }
