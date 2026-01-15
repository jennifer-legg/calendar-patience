import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'
import * as API from '../apis/saveGame.ts'

export function useGetSavedGame(id: number) {
  return useQuery({
    queryKey: ['savedGame'],
    queryFn: () => API.getSavedGame(id),
  })
}

export function useGetSaveOverviewByUserId(userId: string) {
  const query = useQuery({
    queryKey: ['overview'],
    queryFn: () => API.getSaveOverviewByUserId(userId),
  })
  return {
    ...query,
    deleteSavedGame: useDeleteSavedGame(),
  }
}

export function useSaveGameMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedGame'] })
      queryClient.invalidateQueries({ queryKey: ['overview'] })
    },
  })

  return mutation
}

export function useAddSave() {
  return useSaveGameMutation(API.saveGame)
}

export function useDeleteSavedGame() {
  return useSaveGameMutation(API.deleteSavedGame)
}
