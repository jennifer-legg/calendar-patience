interface Props {
  fn: () => void
  classes?: string[]
  text: string
}

export default function Button({ fn, classes, text }: Props) {
  return (
    <button
      className={classes && classes[0] ? classes.join(' ') : ''}
      onClick={() => fn()}
    >
      {text}
    </button>
  )
}
