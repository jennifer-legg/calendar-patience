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
    <table>
      <caption>Statistics</caption>
      <thead>
        <tr>
          <th>Wins</th>
          <th>Losses</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>{data && data.wins ? data.wins : '0'}</th>
          <th>{data && data.losses ? data.losses : '0'}</th>
        </tr>
      </tbody>
    </table>
  )
}
