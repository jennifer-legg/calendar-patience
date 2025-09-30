// import { useNewDeck,  } from '../hooks/useDeck.ts'
import { useNewDeck } from '../hooks/useDeck.ts'
import OpenCard from './OpenCard.tsx'
import Pile from './Pile.tsx'
// import { useState } from 'react'
// import type { Card } from '../../models/deck.ts'

function ClockPatience() {
  // const [isDrawn, setisDrawn] = useState<boolean>(false)
  // const [openCard, setOpenCard] = useState<Card | null>(null)
  // const [turnedCards, setTurnedCards] = useState([])
  const { data, isError, isPending, error } = useNewDeck()

  if (isPending) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>{error.message}</p>
  }

  const deckId: string = data

  //Setup piles
  const clockPosition = [
    'middle',
    'deg300',
    'deg330',
    'deg0',
    'deg30',
    'deg60',
    'deg90',
    'deg120',
    'deg150',
    'deg180',
    'deg210',
    'deg240',
    'deg270',
  ]

  const handlePileClick = (pile: string) => {
    console.log(`card clicked from ${pile}`)
    // if (deckId) {
    //   const { data } = drawCard(deckId, pile)
    //   if (data && data.card) {
    //     setisDrawn(true)
    //     setOpenCard(data.card)
    //   }
    // }
  }

  return (
    <>
      <div className="app">
        <h1>Calendar Patience</h1>
        <div className="circle-container">
          {deckId &&
            clockPosition.map((item, i) => {
              let pileType: string = ''
              switch (i) {
                case 0:
                  pileType = 'King'
                  break
                case 1:
                  pileType = 'Ace'
                  break
                case 11:
                  pileType = 'Jack'
                  break
                case 12:
                  pileType = 'Queen'
                  break
                default:
                  pileType = `${i}`
              }
              return (
                <div key={`pile${i}`}>
                  <Pile
                    number={i}
                    deckId={deckId}
                    deg={item}
                    pileType={pileType}
                    handlePileClick={handlePileClick}
                  />
                </div>
              )
            })}
        </div>
        {/* {isDrawn && openCard && <OpenCard card={openCard} />} */}
      </div>
    </>
  )
}

export default ClockPatience
