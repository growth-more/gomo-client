import { endpoints } from '@/api/endpoints'
import { fetches } from '@/api/fetches'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useUpdateWidget() {
  const queryClient = useQueryClient()

  const { mutate: updateWidget } = useMutation({
    mutationFn: fetches.member.updateWidget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET', endpoints.member.getWidget] })
    },
  })

  return { updateWidget }
}
