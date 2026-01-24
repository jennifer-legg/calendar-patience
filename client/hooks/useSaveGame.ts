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
  return useQuery({
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
}

export function useMutateSavedGame() {
  return {
    deleteGame: useMutations(API.deleteSavedGame),
    editGame: useMutations(API.editSavedGame),
    addGame: useMutations(API.saveGame),
  }
}

function useMutations<TData = unknown, TVariables = unknown>(
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
