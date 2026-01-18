import { Card } from '../../models/deck'
import { Pile } from '../../models/savedGame'

export function createBeginningPileData(arr: Card[][]): Pile[] {
  return arr.map((pile, i) => {
    const pileType: string =
      i === 0
        ? 'king'
        : i === 1
          ? 'ace'
          : i === 11
            ? 'jack'
            : i === 12
              ? 'queen'
              : `${i}`
    return {
      pileType,
      pileCards: pile,
      facedownCards: pile,
      faceupCards: [],
      buttonIsClickable: pileType === 'king',
      buttonIsVisible: true,
      pileNumber: i,
    }
  })
}
