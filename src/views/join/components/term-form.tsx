import { Box, Checkbox, FormControlLabel, Stack, Typography } from '@mui/material'

const TERM_HEIGHT = 350

interface TermFormProps {
  title: string
  content: string
  isAgree: boolean
  onAgree?: () => void
}

export function TermForm({ title, content, isAgree, onAgree }: TermFormProps) {
  return (
    <Stack spacing={1}>
      <Typography variant="subtitle1">{title}</Typography>
      <Box
        border={1}
        borderColor="divider"
        borderRadius={1}
        p={2}
        height={TERM_HEIGHT}
        sx={{ overflowY: 'auto' }}
      >
        <Typography whiteSpace="pre-line" color="text.secondary" variant="caption">
          {content}
        </Typography>
      </Box>
      <FormControlLabel
        control={<Checkbox checked={isAgree} onChange={onAgree} />}
        label={
          <Typography variant="subtitle2" fontWeight={400}>
            동의합니다
          </Typography>
        }
        sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
      />
    </Stack>
  )
}
