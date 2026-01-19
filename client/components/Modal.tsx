import { useEffect } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  open: boolean
  content: React.ReactNode
  closeModal: () => void
  classes: string[]
  button1?: ButtonData
  button2?: ButtonData
}

interface ButtonData {
  function: () => void
  text: string
}

export default function Modal({
  open,
  closeModal,
  content,
  classes,
  button1,
  button2,
}: Props) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        if (closeModal) {
          closeModal()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, closeModal])

  const portal = document.getElementById('portal')
  if (!open || !portal || !content) return null

  return (
    <>
      {createPortal(
        <>
          <div className="modal-background-overlay" />
          <div className={`modal ${classes ? classes.join(' ') : ''}`}>
            <button
              aria-label="close"
              className="close-modal"
              onClick={closeModal}
            >
              X
            </button>
            <div className="modal-content">
              {content}
              {button1 && (
                <button onClick={button1.function}>{button1.text}</button>
              )}

              {button2 && (
                <button onClick={button2.function}>{button2.text}</button>
              )}
            </div>
          </div>
        </>,
        portal,
      )}
    </>
  )
}
