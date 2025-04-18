import { paths } from '@/routes'
import { Button, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export function FormOptions() {
  return (
    <Stack width={1} direction="row" spacing={2} justifyContent="space-between" alignItems="center">
      <Button component={Link} to={paths.root} variant="plainText" disableRipple>
        <Typography variant="caption">아이디 / 비밀번호 찾기</Typography>
      </Button>
      <Button component={Link} to={paths.join} variant="plainText" disableRipple>
        <Typography variant="caption">회원가입</Typography>
      </Button>
    </Stack>
  )
}
