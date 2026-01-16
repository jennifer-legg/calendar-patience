import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'
import * as API from '../apis/saveGame.ts'
import { useAuth0 } from '@auth0/auth0-react'

export function useGetSavedGame(id: number) {
  const { getAccessTokenSilently } = useAuth0()
  return useQuery({
    queryKey: ['savedGame'],
    queryFn: async () => {
      try {
        const token = await getAccessTokenSilently()
        return API.getSavedGame(id, token)
      } catch (err) {
        console.log('Authorization error')
      }
    },
  })
}

export function useGetSaveOverviewByUserId() {
  const { getAccessTokenSilently } = useAuth0()
  const query = useQuery({
    queryKey: ['overview'],
    queryFn: async () => {
      try {
        const token = await getAccessTokenSilently()
        return API.getSaveOverviewByUserId(token)
      } catch (err) {
        console.log('Authorization error')
      }
    },
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
