import { useGetSaveOverviewByUserId } from '../hooks/useSaveGame'
import { Link } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'

export default function SaveOverview() {
  const { data, isError, isPending, deleteSavedGame } =
    useGetSaveOverviewByUserId('1')

  if (isPending) {
    return <p>Loading...</p>
  }

  if (isError || !data || !data[0]) {
    return (
      <div>
        <p>No saved games found</p>
      </div>
    )
  }

  const gameOverview = data.map((item) => {
    const saveDate = new Date(item.date)
    return { ...item, date: saveDate.toLocaleString() }
  })

  const handleDelete = (saveId: number) => {
    deleteSavedGame.mutate(saveId)
  }

  return (
    <div>
      <h2>Your saved games</h2>
      <ul>
        {gameOverview.map((item) => (
          <li key={item.id}>
            <Link to={`/save/${item.id}`}>{item.date}</Link>
            <button
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
