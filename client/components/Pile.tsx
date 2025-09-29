interface Props {
  number: number
  deckId: string
  deg: string
  pileType: string
  handlePileClick: (pile: string) => void
}

export default function Pile({
  number,
  deg,
  pileType,
  handlePileClick,
}: Props) {
  return (
    <div
      className={`${deg} circle-item`}
      id={`facedown-position-${number}oclock`}
    >
      <p>{pileType} </p>
      <button
        className="card-container"
        onClick={() => handlePileClick(pileType)}
      >
        <img
          className="card"
          src="https://www.deckofcardsapi.com/static/img/back.png"
          alt="Back of a playing card with white and black patterning"
        />
      </button>
    </div>
  )
}
