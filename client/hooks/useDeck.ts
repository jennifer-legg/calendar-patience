import {
  useQuery,
  // useMutation,
  // useQueryClient,
  // MutationFunction,
} from '@tanstack/react-query'
import { getNewDeck, drawCardFromPile } from '../apis/deck.ts'

export function useNewDeck() {
  const data = useQuery({
    queryKey: ['deck'],
    queryFn: getNewDeck,
  })
  return data
}

export function useGetCardFromPile(deckId: string, pile: string) {
  const data = useQuery({
    queryKey: ['card'],
    queryFn: () => drawCardFromPile(deckId, pile),
  })
  return data
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
