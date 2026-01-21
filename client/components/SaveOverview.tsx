import { useGetSaveOverviewByUserId } from '../hooks/useSaveGame'
import { Link } from 'react-router'
import { useAuth0 } from '@auth0/auth0-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'

export default function SaveOverview() {
  const { data, isError, isPending, deleteSavedGame } =
    useGetSaveOverviewByUserId()
  const { getAccessTokenSilently } = useAuth0()

  if (isPending) {
    return <p>Loading...</p>
  }

  if (isError || !data || !data[0]) {
    return <p>No saved games found</p>
  }

  const gameOverview = data.map((item) => {
    const saveDate = new Date(item.updatedAt ? item.updatedAt : item.createdAt)
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
    <div className="save-overview">
      <h2>Your saved games</h2>
      <ul>
        {gameOverview.map((item) => (
          <li key={item.id}>
            <Link to={`/save/${item.id}`}>{item.date}</Link>
            <button
              className="trash"
              onClick={() => handleDelete(item.id)}
              aria-label={`Delete save ${item.date}`}
            >
              <FontAwesomeIcon icon={faTrashCan} aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
