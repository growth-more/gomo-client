import { useGetHistory } from './use-get-history'

export * from './use-get-history'

export function useHistory(year: number, month: number) {
  const { history, isLoading } = useGetHistory(year, month)

  return { history, isLoading }
}
