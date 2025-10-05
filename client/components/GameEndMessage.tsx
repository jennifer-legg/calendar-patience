interface Props {
  gameLost: boolean
  resetGame: (resetGame: boolean) => void
}
export default function GameEndMessage({ gameLost, resetGame }: Props) {
  const handleClick = () => {
    resetGame(true)
  }

  return (
    <div className={`alert-message ${gameLost ? 'grey-bg' : 'green-bg'} `}>
      {!gameLost && <img src="/images/win.svg" alt="Gold winner's trophy" />}
      {gameLost && (
        <div className="dice-image">
          <img src="/images/red-cross.svg" alt="Red cross" />
        </div>
      )}
      <p>Game Over. {gameLost ? <>Bad luck, the pack won</> : <>You won!</>}</p>
      <button onClick={handleClick}>Play again</button>
    </div>
  )
}
