import { useGetSaveOverviewByUserId } from '../hooks/useSaveGame'
import { Link } from 'react-router'
import { useAuth0 } from '@auth0/auth0-react'

interface Props {
  userId: string
}

export default function SaveOverview({ userId }: Props) {
  const { data, isError, isPending, deleteSavedGame } =
    useGetSaveOverviewByUserId(userId)
  const { getAccessTokenSilently } = useAuth0()

  if (isPending) {
    return <p>Loading...</p>
  }

  if (isError || !data || !data[0]) {
    return <p>No saved games found</p>
  }

  const gameOverview = data.map((item) => {
    const saveDate = new Date(item.date)
    return { ...item, date: saveDate.toLocaleString() }
  })

  const handleDelete = async (saveId: number) => {
    try {
      const token = await getAccessTokenSilently()
      deleteSavedGame.mutate({ saveId, token })
    } catch (err) {
      console.log('Error authenticating ')
    }
  }

  return (
    <ul>
      {gameOverview.map((item) => (
        <li key={item.id}>
          <Link to={`/save/${item.id}`}>{item.date}</Link>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </li>
      ))}
    </ul>
  )
}
