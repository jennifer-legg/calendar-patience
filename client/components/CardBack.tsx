interface Props {
  imgGlows: boolean
}

export default function CardBack({ imgGlows }: Props) {
  return (
    <>
      {' '}
      <img
        className={`${imgGlows ? 'inner-glow' : 'plain'}`}
        src="https://www.deckofcardsapi.com/static/img/back.png"
        alt={`Patterned back of a playing card${imgGlows ? ' glowing blue' : ''}`}
      />
    </>
  )
}
