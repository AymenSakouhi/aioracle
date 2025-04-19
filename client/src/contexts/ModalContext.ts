import { useContext, createContext } from 'react'

type ModalContextType = {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
)

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('Context is not available or is not within the provided')
  }
  return context
}
