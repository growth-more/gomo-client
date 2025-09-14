import { Box, Stack, Theme, SxProps } from '@mui/material'

const OAUTH_BTN_SIZE = 40

const oauthImgSx: SxProps<Theme> = {
  width: OAUTH_BTN_SIZE,
  height: OAUTH_BTN_SIZE,
}

const oauthBtnSx: SxProps<Theme> = {
  p: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
}

export function OAuthForm() {
  return (
    <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
      <Box
        component="a"
        href={`${import.meta.env.VITE_OAUTH_NAVER}`}
        bgcolor="transparent"
        sx={oauthBtnSx}
      >
        <Box component="img" src="/img/oauth/naver.png" sx={oauthImgSx} />
      </Box>
      <Box
        component="a"
        href={`${import.meta.env.VITE_OAUTH_KAKAO}`}
        bgcolor="transparent"
        sx={oauthBtnSx}
      >
        <Box component="img" src="/img/oauth/kakao.svg" sx={oauthImgSx} />
      </Box>
      <Box
        component="a"
        href={`${import.meta.env.VITE_OAUTH_GOOGLE}`}
        bgcolor="transparent"
        sx={oauthBtnSx}
      >
        <Box component="img" src="/img/oauth/google.svg" sx={oauthImgSx} />
      </Box>
    </Stack>
  )
}
