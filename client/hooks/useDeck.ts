import {
  useQuery,
  // useMutation,
  // useQueryClient,
  // MutationFunction,
} from '@tanstack/react-query'
import { getNewDeck } from '../apis/deck.ts'

export function useNewDeck() {
  const query = useQuery({ queryKey: ['deck'], queryFn: getNewDeck })
  return {
    ...query,
    // Extra queries go here e.g. addFruit: useAddFruit()
  }
}

// export function useFruitsMutation<TData = unknown, TVariables = unknown>(
//   mutationFn: MutationFunction<TData, TVariables>,
// ) {
//   const queryClient = useQueryClient()
//   const mutation = useMutation({
//     mutationFn,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['fruits'] })
//     },
//   })

//   return mutation
// }

// Query functions go here e.g. useAddFruit
/* function useAddFruit() {
  return useFruitsMutation(addFruit)
} */
