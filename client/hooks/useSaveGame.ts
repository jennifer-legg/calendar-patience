import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'
import * as API from '../apis/saveGame.ts'

export function useSaveGame() {
  return useQuery({
    queryKey: ['savedGame'],
    queryFn: API.getSavedGame,
  })
}

export function useSaveGameMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedGame'] })
    },
  })

  return mutation
}

export function useAddSave() {
  return useSaveGameMutation(API.saveGame)
}
