import { useMutation } from '@tanstack/react-query'
import { endpoints, fetches } from '@/api'

export function useJoin() {
  const { mutate: join } = useMutation({
    mutationKey: ['POST', endpoints.member.create],
    mutationFn: fetches.member.create,
  })

  const { mutate: checkHandleDuplicate } = useMutation({
    mutationKey: ['GET', endpoints.member.checkHandleDuplicate],
    mutationFn: fetches.member.checkHandleDuplicate,
  })

  const { mutate: createEmailAuthCode } = useMutation({
    mutationKey: ['POST', endpoints.member.createEmailCode],
    mutationFn: fetches.member.createEmailCode,
  })

  const { mutate: verifyEmailCode } = useMutation({
    mutationKey: ['POST', endpoints.member.verifyEmailCode],
    mutationFn: fetches.member.verifyEmailCode,
  })

  return { join, checkHandleDuplicate, createEmailAuthCode, verifyEmailCode }
}
