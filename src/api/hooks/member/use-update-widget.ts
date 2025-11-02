import { endpoints } from '@/api/endpoints'
import { fetches } from '@/api/fetches'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useUpdateWidget() {
  const queryClient = useQueryClient()

  const { mutate: updateWidget } = useMutation({
    mutationFn: fetches.member.updateWidget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.member.profile] })
      toast.success('위젯이 저장되었습니다.')
    },
  })

  return { updateWidget }
}
