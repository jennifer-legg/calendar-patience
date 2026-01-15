import { useGetSaveOverviewByUserId } from '../hooks/useSaveGame'
import { Link } from 'react-router'

export default function SaveOverview() {
  const { data, isError, isPending } = useGetSaveOverviewByUserId('1')

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

  return (
    <div>
      <h2>Your saved games</h2>
      <ul>
        {gameOverview.map((item) => (
          <li key={item.id}>
            <Link to={`/save/${item.id}`}>{item.date}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
