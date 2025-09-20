import { fetches } from '@/api'
import { OauthProvider } from '@/entities/profile'
import { useEffectOnce } from '@/hooks'
import { paths } from '@/routes'
import { useTokenStore } from '@/stores'
import { useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

interface OauthResultProps {
  provider: OauthProvider
}

export function OauthResult({ provider }: OauthResultProps) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { setAccessToken } = useTokenStore()

  const code = useMemo(() => searchParams.get('code'), [searchParams])

  useEffectOnce(async () => {
    if (!code) {
      return
    }
    const { accessToken, userInfo } = await fetches.auth.oauth({ provider, code })

    // oauth login
    if (accessToken) {
      setAccessToken(accessToken)
      navigate(paths.root, { replace: true })
      return
    }

    // oauth join
    navigate(paths.join, { replace: true, state: userInfo })
    return
  }, [provider, code])

  return <div></div>
}
