import React, { useState } from 'react'
import { ModalContext, useModal } from '../../contexts/ModalContext'

type ModalWrapperProvider = {
  children: React.ReactNode
}

export const ModalProvider: React.FC<ModalWrapperProvider> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

type ModalWrapperProps = {
  children: React.ReactNode
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children }) => {
  const { isOpen, closeModal } = useModal()

  if (!isOpen) return null

  return (
    <div className="fixed w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <button
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        onClick={closeModal}
      >
        X
      </button>
      {children}
    </div>
  )
}

export default ModalWrapper
