import { FullContainer } from '@/components/container'
import { Box } from '@mui/material'
import { Form, LoginForm, OAuthDivider, OAuthForm } from './components'
import { useAuth } from '@/auth/hooks'
import { OnlyGuest } from '@/auth/guard'

export function LoginPage() {
  const { login } = useAuth()

  const submitHandler = (form: Form) => {
    login({
      email: form.email,
      password: form.password,
    })
  }

  return (
    <OnlyGuest>
      <FullContainer>
        <Box
          sx={{
            width: 320,
            px: 2,
            py: 3,
            border: 1,
            borderRadius: 2,
            bgcolor: (theme) => theme.palette.background.default,
            borderColor: (theme) => theme.palette.border.main,
          }}
        >
          <LoginForm onSubmit={submitHandler} autoReset={false} />
          <OAuthDivider />
          <OAuthForm />
        </Box>
      </FullContainer>
    </OnlyGuest>
  )
}
