import { Divider, Typography } from '@mui/material'

import { Stack } from '@mui/material'

export function OAuthDivider() {
  return (
    <Stack width={1} direction="row" spacing={1} justifyContent="center" alignItems="center" p={2}>
      <Divider sx={{ flex: 1 }} />
      <Typography variant="caption" color="text.secondary">
        또는
      </Typography>
      <Divider sx={{ flex: 1 }} />
    </Stack>
  )
}
