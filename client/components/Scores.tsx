import { useGetScores } from '../hooks/useScores'

export default function Scores() {
  const { data, isPending, isError } = useGetScores()

  if (isPending) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error loading scores</p>
  }
  return (
    <div className="scores">
      <h2>Statistics</h2>
      <table>
        <thead>
          <tr>
            <th>Wins</th>
            <th>Losses</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data && data.wins ? data.wins : '0'}</td>
            <td>{data && data.losses ? data.losses : '0'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
