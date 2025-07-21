import { Iconify } from '@/components/iconify'
import { Stack, Typography } from '@mui/material'

export function HistoryWidgetEmpty() {
  return (
    <Stack
      width={1}
      height={1}
      alignItems="center"
      justifyContent="center"
      spacing={1}
      bgcolor={(theme) => theme.palette.background.light}
      border={1}
      borderRadius={1}
      borderColor={(theme) => theme.palette.divider}
      sx={{ borderStyle: 'dashed' }}
    >
      <Iconify icon="material-symbols-light:folder-open-outline-rounded" width={50} />
      <Stack alignItems="center">
        <Typography fontSize={16} fontWeight={500} color="text.secondary">
          퀘스트 기록이 없습니다.
        </Typography>
        <Typography fontSize={12} fontWeight={400} color="text.secondary">
          퀘스트를 수행해서 기록을 남겨보세요.
        </Typography>
      </Stack>
    </Stack>
  )
}
