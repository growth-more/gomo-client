import { fetches } from '@/api'
import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

interface OauthResultProps {
  provider: 'google' | 'kakao' | 'naver'
}

export function OauthResult({ provider }: OauthResultProps) {
  const [searchParams] = useSearchParams()

  const code = useMemo(() => searchParams.get('code'), [searchParams])

  useEffect(() => {
    if (!code) {
      return
    }
    fetches.auth.oauth({ provider, code })
  }, [provider, code])

  return <div></div>
}
