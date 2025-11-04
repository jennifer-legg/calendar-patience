import { preload } from 'react-dom'

interface Props {
  gameLost: boolean
  resetGame: (resetGame: boolean) => void
}
export default function GameEndMessage({ gameLost, resetGame }: Props) {
  const handleClick = () => {
    resetGame(true)
  }
  preload('/images/red-cross.svg', { as: 'image' })
  preload('/images/dice.svg', { as: 'image' })
  preload('/images/win.svg', { as: 'image' })

  if (gameLost) {
    return (
      <div className="alert-message grey-bg">
        <div className="dice-container">
          <img
            className="cross-image-front"
            src="/images/red-cross.svg"
            alt="Red cross"
          />
          <img src="/images/dice.svg" alt="White dice" />
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
