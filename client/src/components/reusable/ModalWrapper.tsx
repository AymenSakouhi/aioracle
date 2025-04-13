import React from 'react'

type ModalWrapperProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <button
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        onClick={onClose}
      >
        X
      </button>
      {children}
    </div>
  )
}

export default ModalWrapper
