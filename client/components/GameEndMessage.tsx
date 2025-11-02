interface Props {
  gameLost: boolean
  resetGame: (resetGame: boolean) => void
}
export default function GameEndMessage({ gameLost, resetGame }: Props) {
  const handleClick = () => {
    resetGame(true)
  }

  if (gameLost) {
    return (
      <div className="alert-message grey-bg">
        <div className="dice-image">
          <img src="/images/red-cross.svg" alt="Red cross" />
        </div>
        <p>Game Over. Bad luck, the pack won</p>
        <button onClick={handleClick}>Play again</button>
      </div>
    )
  } else {
    return (
      <div className="alert-message green-bg">
        <img src="/images/win.svg" alt="Gold winner's trophy" />
        <p>Game Over. You won!</p>
        <button onClick={handleClick}>Play again</button>
      </div>
    )
  }
}
