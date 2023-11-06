import { createContext, useContext, useState } from 'react'

type ContextProps = React.PropsWithChildren

type ProviderContext = {
   isModalOpen: boolean
   showModal: (e: React.ReactNode) => void
   closeModal: () => void
   modalContent: React.ReactNode | null
}

const ModalContext = createContext<ProviderContext | null>(null)

const ModalProvider = ({ children }: ContextProps) => {

   const [isModalOpen, setModal] = useState(false)
   const [modalContent, setModalContent] = useState<React.ReactNode | null>(null)
   const closeModal = () => {
      setModal(false)
      setModalContent(null)
   }
   const showModal = (element: React.ReactNode) => {
      setModal(true)
      setModalContent(element)
   }
   
   return (
      <ModalContext.Provider value={{ isModalOpen, showModal, closeModal, modalContent }}>
         {children}
      </ModalContext.Provider>
   )
}

export default ModalProvider

// eslint-disable-next-line react-refresh/only-export-components
export const useModalContext = () => {
   return useContext(ModalContext)
}