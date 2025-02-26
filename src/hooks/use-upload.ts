import { useCallback, useEffect, useRef } from 'react'

interface UploadOptions {
  multiple?: boolean
  accept?: string
  maxSize?: number
  onSuccess?: (files: File[]) => void
  onError?: (error: Error) => void
}

export function useUpload({
  multiple = false,
  accept = 'image/*',
  maxSize = 1024 * 1024 * 10,
  onSuccess,
  onError,
}: UploadOptions) {
  const inputRef = useRef<HTMLInputElement>(document.createElement('input'))

  const uploadHandler = useCallback(
    (e: Event) => {
      const target = e.target as HTMLInputElement
      const files = Array.from(target.files || [])

      if (files.some((file) => file.size > maxSize)) {
        onError?.(new Error('File size is too large'))
        return
      }
      onSuccess?.(files)
    },
    [maxSize, onError, onSuccess]
  )

  const upload = useCallback(() => {
    inputRef.current.click()
  }, [])

  useEffect(() => {
    const input = inputRef.current

    input.type = 'file'
    input.accept = accept
    input.multiple = multiple
    input.style.display = 'none'
    input.addEventListener('change', uploadHandler)

    return () => {
      input.removeEventListener('change', uploadHandler)
    }
  }, [accept, multiple, uploadHandler])

  return { upload }
}
