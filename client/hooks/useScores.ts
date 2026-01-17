import {
  useQuery,
  // useMutation,
  // useQueryClient,
  // MutationFunction,
} from '@tanstack/react-query'
import * as API from '../apis/scores.ts'
import { useAuth0 } from '@auth0/auth0-react'

export function useGetScores() {
  const { getAccessTokenSilently } = useAuth0()
  return useQuery({
    queryKey: ['scores'],
    queryFn: async () => {
      try {
        const token = await getAccessTokenSilently()
        return API.getScoreByUserId(token)
      } catch (err) {
        console.log('Authorization error')
      }
    },
  })
}

// export function useSaveGameMutation<TData = unknown, TVariables = unknown>(
//   mutationFn: MutationFunction<TData, TVariables>,
// ) {
//   const queryClient = useQueryClient()
//   const mutation = useMutation({
//     mutationFn,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['scores'] })
//     },
//   })

//   return mutation
// }
