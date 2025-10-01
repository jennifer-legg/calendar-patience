interface Props {
  gameLost: boolean
  resetGame: (resetGame: boolean) => void
}
export default function GameEndMessage({ gameLost, resetGame }: Props) {
  const handleClick = () => {
    resetGame(true)
  }

  return (
    <div className="alert-message">
      <p>Game Over. {gameLost ? <>Bad luck, the pack won</> : <>You won!</>}</p>
      <button onClick={handleClick}>Play again</button>
    </div>
  )
}
