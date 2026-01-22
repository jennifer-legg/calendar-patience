import { useGetSaveOverviewByUserId } from '../hooks/useSaveGame'
import { Link } from 'react-router'
import { useAuth0 } from '@auth0/auth0-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'

export default function SaveOverview() {
  const { data, isError, isPending, deleteSavedGame } =
    useGetSaveOverviewByUserId()
  const { getAccessTokenSilently } = useAuth0()

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
      {isPending ? (
        <p>Loading...</p>
      ) : isError || !data ? (
        <p>Error retrieving your saved games. Please try again later.</p>
      ) : !data[0] ? (
        <p>No saved games.</p>
      ) : (
        <ul>
          {data.map((item) => {
            const saveDate = new Date(
              item.updatedAt ? item.updatedAt : item.createdAt,
            ).toLocaleString('en-GB', { timeZone: 'UTC' })

            return (
              <li key={item.id}>
                <Link to={`/save/${item.id}`}>{saveDate}</Link>
                <button
                  className="trash"
                  onClick={() => handleDelete(item.id)}
                  aria-label={`Delete save ${saveDate}`}
                >
                  <FontAwesomeIcon icon={faTrashCan} aria-hidden="true" />
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
