import React from 'react'

interface Props {
  fn: () => void
  classes?: string[]
  content: React.ReactNode
}

export default function Button({ fn, classes, content }: Props) {
  return (
    <button
      className={classes && classes[0] ? classes.join(' ') : ''}
      onClick={() => fn()}
    >
      {content}
    </button>
  )
}
