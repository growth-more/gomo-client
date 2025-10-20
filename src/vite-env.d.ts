/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENABLE_MOCK_API: string
  readonly VITE_API_URL: string
  readonly VITE_OAUTH_GOOGLE: string
  readonly VITE_OAUTH_KAKAO: string
  readonly VITE_OAUTH_NAVER: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
