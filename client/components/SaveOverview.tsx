import { useGetSaveOverviewByUserId } from '../hooks/useSaveGame'
import { Link } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import useMutateSaveGame from '../hooks/useMutateSaveGame'

export default function SaveOverview() {
  const { data, isError, isPending } = useGetSaveOverviewByUserId()
  const mutate = useMutateSaveGame()

  const handleDelete = async (saveId: number) => {
    mutate({ mutationType: 'delete', id: saveId })
  }

  return (
    <div className="save-overview">
      <h2>Your saved games</h2>
      {isPending ? (
        <p>Loading...</p>
      ) : isError ? (
        <>
          <p>Error retrieving your saved games.</p>{' '}
          <p>Please try again later.</p>
        </>
      ) : !data || !data[0] ? (
        <p>No saved games.</p>
      ) : (
        <ul className="saved-games">
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
