/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENABLE_MOCK_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
