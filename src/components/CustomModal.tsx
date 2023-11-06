import { AiOutlineClose } from "react-icons/ai"
import { useModalContext } from "../context/ModalProvider"
import { cn } from "../utility/utility"

type CustomModalProps = React.HTMLAttributes<HTMLElement>

const CustomModal = ({className, children} : CustomModalProps) => {
   const {closeModal} = useModalContext()!

   const handleCloseEvent = (e: React.MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('.modal__content')
      if(target) return
      closeModal()
   }

   return (
      <div
         onClick={handleCloseEvent}
         className={cn(
            'z-10 flex items-center justify-center after:bg-black/20 after:z-[-1] after:w-[200vw] after:h-[200dvh] after:backdrop-blur-sm after:fixed relative',
            className
         )}
      >  <aside onClick={closeModal} className="text-accent top-4 right-4 absolute cursor-pointer transition-transform hover:rotate-[225deg]">
         <AiOutlineClose className="text-3xl" />
      </aside>
         <div className='modal__content min-w-[40vw] min-h-[20dvh] flex items-center justify-center bg-neutral rounded-lg'>
            {children}
         </div>
      </div>
   )
}

export default CustomModal
