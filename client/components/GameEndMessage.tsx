import { preload } from 'react-dom'
import { GameEndStatus } from '../../models/savedGame'

interface Props {
  gameEndStatus: GameEndStatus
}
export default function GameEndMessage({ gameEndStatus }: Props) {
  preload('/images/diceCrossed-50.webp', { as: 'image' })
  preload('/images/win.svg', { as: 'image' })

  if (gameEndStatus === 'lost') {
    return (
      <>
        <img
          src="/images/diceCrossed-50.webp"
          alt="Dice with red cross through the middle"
        />
        <p>Game Over</p>
        <p>Bad luck, the pack won</p>
      </>
    )
  } else {
    return (
      <>
        <img src="/images/win.svg" alt="Gold winner's trophy" />
        <p>Game Over. You won!</p>
      </>
    )
  }
}
