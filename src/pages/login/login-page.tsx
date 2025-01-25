import { FullContainer } from '@/components/container'
import { alpha, Box, SxProps, Theme } from '@mui/material'
import { Form, LoginForm } from './components/login-form'
import { OAuthForm } from './components/oauth-form'
import { OAuthDivider } from './components/oauth-divider'

const backgroundSx: SxProps<Theme> = {
  backgroundImage: 'url("/img/cover.webp")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}

export function LoginPage() {
  const submitHandler = (form: Form) => {
    console.log(form)
    console.log('submit')
  }

  return (
    <FullContainer sx={backgroundSx}>
      <Box
        sx={{
          width: 350,
          p: 2,
          bgcolor: (theme) => alpha(theme.palette.background.paper, 0.5),
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
        }}
      >
        <LoginForm onSubmit={submitHandler} autoReset={false} />
        <OAuthDivider />
        <OAuthForm />
      </Box>
    </FullContainer>
  )
}
