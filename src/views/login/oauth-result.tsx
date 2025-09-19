import { fetches } from '@/api'
import { OauthProvider } from '@/entities/profile'
import { useEffectOnce } from '@/hooks'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

interface OauthResultProps {
  provider: OauthProvider
}

export function OauthResult({ provider }: OauthResultProps) {
  const [searchParams] = useSearchParams()

  const code = useMemo(() => searchParams.get('code'), [searchParams])

  useEffectOnce(() => {
    if (!code) {
      return
    }
    fetches.auth.oauth({ provider, code })
  }, [provider, code])

  return <div></div>
}
